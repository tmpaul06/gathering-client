import React from 'react';
import { socket } from '../socket';

export default class RectangleRemoteManipulationWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      width: 150,
      height: 100,
      rotate: 0
    };
  }

  componentDidMount() {
    // Receive MOVE and ROTATE commands over network.
    // Assign MOVE clients, and ROTATE clients
  }

  componentWillUnmount() {

  }

  render() {
    let styles = this.getStyles();
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

  getMoveView() {

  }

  getRotateView() {

  }
};