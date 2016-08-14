import React from 'react';
import Draggable from '../utils/Draggable';

let DraggableRect = Draggable('rect');

export default class RectangleInterface extends React.Component {
  //**********************************************************
  // Static fields
  //**********************************************************
  static SVG_DIM = {
    WIDTH: 600,
    HEIGHT: 400
  };
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
      rotation: 0
    };
    this.handleRectDrag = this.handleRectDrag.bind(this);
  }
  //**********************************************************
  // React methods
  //**********************************************************
  render() {
    return (
      <div className='cell-container'>
        <div className='row'>
          <div className='eight columns'>
            <p>Resource</p>
          </div>
          <div className='four columns'>
            <p>Representation</p>
          </div>
        </div>
        {this.getView()}
        <p>Drag to move. Shift + Drag to rotate</p>
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
    return (<div className='row'>
      <div className='eight columns'>
        <svg height={RectangleInterface.SVG_DIM.HEIGHT} width={RectangleInterface.SVG_DIM.WIDTH}>
          <DraggableRect
            transform={this.getTransform()}
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            style={styles.rect}
            onDrag={this.handleRectDrag}
          />
        </svg>
      </div>
      <div className='four columns'>
        <pre style={{
          height: 372,
          color: '#fff',
          width: 'inherit',
          display: 'table-cell',
          verticalAlign: 'middle',
          outline: 'none',
          background: '#585858'
        }} contentEditable={true} ref="pre" onKeyUp={() => this.handlePreChange()}
          onKeyDown={(e) => {
            let code = e.keyCode || e.which;
            if (code === 37 || code === 39) {
              e.preventDefault();
              return false;
            }
          }}>
          {JSON.stringify(this.getPreState(), null, 2)}
        </pre>
      </div>
    </div>);
  }

  handleRectDrag(obj) {
    let event = obj.e;
    if (event.shiftKey) {
      // Rotate
      let rotation = this.state.rotation;
      rotation += obj.dx;
      return this.setState({
        rotation
      });
    } else {
      let { x, y } = this.state;
      let minX = 0;
      let minY = 0;
      let maxX = RectangleInterface.SVG_DIM.WIDTH - this.state.width;
      let maxY = RectangleInterface.SVG_DIM.HEIGHT - this.state.height;
      x = x + obj.dx;
      y = y + obj.dy;
      if (x > maxX) {
        x = maxX;
      }
      if (x < minX) {
        x = minX;
      }
      if (y > maxY) {
        y = maxY;
      }
      if (y < minY) {
        y = minY;
      }
      this.setState({
        x,
        y
      });
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