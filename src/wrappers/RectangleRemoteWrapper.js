import React from 'react';
import { socket } from '../socket';
import RoleWrapper from './RoleWrapper';
import SingleChoice from '../components/SingleChoice';
import InputRange from 'react-input-range';
import UserStore from '../stores/UserStore';

export default class RectangleRemoteManipulationWrapper extends React.Component {
  //**********************************************************
  // Constructor
  //**********************************************************
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      width: 150,
      height: 100,
      rotation: 0,
      direction: 'x',
      rotate: 0,
      move: {
        x: 0,
        y: 0
      }
    };
  }
  //**********************************************************
  // React methods
  //**********************************************************
  componentDidMount() {
    // Receive MOVE and ROTATE commands over network.
    socket.on('moveRectangle', (data) => {
      let dimension = data.dimension;
      let delta = data.delta;
      // Move it in the correct dimension by delta units
      this.state[dimension] = delta;
      this.forceUpdate();
    });

    socket.on('rotateRectangle', (data) => {
      // Rotate in the given direction by delta degrees
      this.setState({
        rotation: data.angle
      });
    });
  }

  componentWillUnmount() {
    socket.off('moveRectangle');
    socket.off('rotateRectangle');
  }

  render() {
    return (
      <div>
        {this.getView()}
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
    if (this.props.view === 'move') {
      return this.getMoveView();
    } else if (this.props.view === 'rotate') {
      return this.getRotateView();
    } else {
      return this.getRegularView();
    }
  }

  getRegularView() {
    let styles = this.getStyles();
    let rect = this.state;
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

  getMoveView() {
    // Direction radio, input type slider.
    return (
      <div className='cell-container'>
        <div>
          <div style={{
            background: 'steelblue'
          }}>
            <span className='title'>MOVE</span>
          </div>
          <div style={{
            background: 'rgba(102, 102, 102, 1)'
          }}>
            <span>Select direction</span>
            <SingleChoice
              selectedChoice={this.state.direction}
              handleRadioSelect={this.changeMoveDirection.bind(this)}
              choices={[ 'x', 'y' ]}
            />
          </div>
          <div style={{
            height: 40,
            padding: 20,
            background: '#ffffff'
          }}>
            <InputRange
              maxValue={450}
              minValue={0}
              value={this.state.move[this.state.direction]}
              onChange={this.changeMoveDelta.bind(this)}
              onChangeComplete={this.sendMoveInfo.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }

  changeMoveDirection(d) {
    this.setState({
      direction: d
    });
  }

  changeMoveDelta(component, delta) {
    let move = this.state.move;
    move[this.state.direction] = delta;
    this.setState({
      move
    });
    socket.emit('moveRectangle', {
      dimension: this.state.direction,
      delta: delta
    });
  }

  sendMoveInfo() {
    socket.emit('moveRectangle', {
      dimension: this.state.direction,
      delta: this.state.move[this.state.direction]
    }); 
  }

  getRotateView() {
    // Direction radio, slider for rotation angle
    return (
      <div className='cell-container'>
        <div>
          <div style={{
            background: 'steelblue'
          }}>
            <span className='title'>ROTATE</span>
          </div>
          <div style={{
            height: 40,
            padding: 20,
            background: '#ffffff'
          }}>
          <InputRange
            maxValue={180}
            minValue={-180}
            value={this.state.rotate}
            onChange={this.changeRotationDelta.bind(this)}
            onChangeComplete={this.sendRotationInfo.bind(this)}
          />
          </div>
        </div>
      </div>
    );
  }

  changeRotationDelta(component, delta) {
    this.setState({
      rotate: delta
    });
  }

  sendRotationInfo() {
    socket.emit('rotateRectangle', {
      angle: this.state.rotate
    });
  }

  getTransform() {
    let rotation = this.state.rotation;
    let midX = this.state.x + this.state.width / 2;
    let midY = this.state.y + this.state.height / 2;
    return 'rotate(' + rotation  + ',' + midX + ',' + midY + ')';
  }
};

export default RoleWrapper(RectangleRemoteManipulationWrapper);