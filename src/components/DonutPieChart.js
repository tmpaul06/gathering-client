// Render a donut chart showing the percentage of answers given by
// the crowd. Also show how many people got all the answers correct
import React from 'react';
import { arc, pie, select, interpolate } from 'd3';

function colores_google(n) {
  var colores_g = ['#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#0099c6', '#dd4477', '#66aa00', '#b82e2e', '#316395', '#994499', '#22aa99', '#aaaa11', '#6633cc', '#e67300', '#8b0707', '#651067', '#329262', '#5574a6', '#3b3eac'];
  return colores_g[n % colores_g.length];
}

export default class DonutPieChart extends React.Component {
  static defaultProps = {
    data: [],
    width: 200,
    height: 200
  };

  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount() {
    this.drawChart();
  }
  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    let data = this.props.data;
    let colorScale = this.props.colorScale;
    let width = this.props.width, height = this.props.height;
    let radius = Math.min(width, height) / 2;
    let arcFn = arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

    function arcTween(a) {
      var i = interpolate(Object.assign({}, a, {
        startAngle: 0,
        endAngle: Math.PI * 2
      }), a);
      return function(t) {
        return arcFn(i(t));
      };
    }

    let pieFn = pie()
      .value(function(d) { return d.count; });

    let svg = select(this.refs.svgGroup)
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    let enterSelection = svg.selectAll('.arc')
      .data(pieFn(data))
    .enter()
      .append('path')
      .attr('class', 'arc')
      .style('fill', function(d, i) {
        return colorScale ? colorScale(d) : colores_google(i);
      });

    let updateSelection = svg.selectAll('.arc')
      .transition().duration(3000).attrTween('d', arcTween);
    
    svg.selectAll('.arc')
      .exit().remove();
  }

  render() {
    return (<svg style={{
      background: 'transparent'
    }} width={this.props.width} height={this.props.height}>
      <g ref='svgGroup'>
      </g>
    </svg>);
  }
};