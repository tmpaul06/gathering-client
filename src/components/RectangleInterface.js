import React from 'react';
import RectangleControls from './RectangleManipulationControls';

export default class ReactangleInterface extends React.Component {
  //**********************************************************
  // Constructor
  //**********************************************************
  constructor(props) {
    super(props);
    this.state = {
      x: 200,
      y: 200,
      width: 200,
      height: 100,
      rotation: 0,
      view: 'shape'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  //**********************************************************
  // React methods
  //**********************************************************
  render() {
    return (
      <div className='cell-container'>
        <button 
          className='role-button'
          onClick={() => this.setViewType('shape')}>
          SHAPE
        </button>
        <button 
          className='role-button'
          onClick={() => this.setViewType('json')}>
          JSON
        </button>
        {this.getView()}
        <RectangleControls/>
      </div>
    );
  }
  //**********************************************************
  // Private methods
  //**********************************************************
  getStyles() {
    return {
      rect: {
        stroke: '#fff',
        strokeWidth: 2,
        fill: 'steelblue'
      }
    };
  }

  getTransform() {
    let rotation = this.state.rotation;
    let midX = this.state.x + this.state.width / 2;
    let midY = this.state.y + this.state.height / 2;
    return 'rotate(' + rotation  + ',' + midX + ',' + midY + ')';
  }

  getView() {
    let rect = this.state;
    let styles = this.getStyles();
    if (this.state.view === 'shape') {
      return (<svg height={400} width={600}>
        <rect
          transform={this.getTransform()}
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          style={styles.rect}
        />
      </svg>);
    } else if (this.state.view === 'json') {
      return (<pre contentEditable={true} ref="pre" onKeyUp={()=>this.handlePreChange()}>
        {JSON.stringify(this.getPreState(), null, 2)}
      </pre>);
    }
  }

  getPreKeys() {
    return Object.keys(this.state).filter((f) => f !== 'view');
  }

  getPreState() {
    let keys = this.getPreKeys();
    let obj = {};
    keys.forEach((k) => {
      obj[k] = this.state[k];
    });
    return obj;
  }

  setViewType(viewType) {
    this.setState({
      view: viewType
    });
  }

  handlePreChange() {
    let pre = this.refs.pre;
    let content = pre.innerHTML;
    try {
      let state = JSON.parse(content);
      this.setState(state);
    } catch(e) {
      console.error('JSON parsing exception', e);
    }
  }
}