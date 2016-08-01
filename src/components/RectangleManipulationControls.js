import React from 'react';

export default class RectangleManipulationControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialX: 0,
      initialY: 0,
      rotate: 0
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  render() {
    return (
      <div className='rectangle-controls'>
        {/*<div className='direction-controls'>
          {[ 'up', 'right', 'down', 'left' ].map((direction, i) => {
            return (<div key={i} onClick={() => this.props.move(direction)}
              className={'direction-control ' + direction}>
              {direction.toUpperCase()}
            </div>);
          })}
        </div>*/}
        <div className='circle-control'>
          <div className='arc-handle' style={{
            transform: 'rotate(' + (this.state.rotate + 60) + 'deg) skewX(30deg)'
          }}>
          </div>
        </div>
      </div>
    );
  }
  handleKeyDown(e) {
    let code = e.keyCode || e.which;
    let direction;
    if (code === 38) {
      // up
      direction = 'up';
    } else if (code === 40) {
      // down
      direction = 'down';
    } else if (code === 37) {
      // left
      direction = 'left';
    } else if (code === 39) {
      // right
      direction = 'right';
    }
    if (direction) {
      return this.props.onMove(direction);
    }
    if (code === 74) {
      this.setState({
        rotate: this.state.rotate - 3
      });
      this.props.onRotate(this.state.rotate - 3);
    } else if (code === 75) {
      this.setState({
        rotate: this.state.rotate + 3
      });
      this.props.onRotate(this.state.rotate + 3);
    }
  }
}