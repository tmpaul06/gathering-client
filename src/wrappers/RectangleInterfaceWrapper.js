import React from 'react';
import RectangleInterface from '../components/RectangleInterface';

// Define an interface for retrieving and manipulating the rectangle
// MOVE, ROTATE. We will assign roles to various connections for moving
// and updating at random (assigning roles).
// Then introduce an intermediary (e.g a proxy) which will route to correct
// server. If the proxy does not expose the same interface, it will simply
// reject the request, and client will update with failed status. By enforcing
// a uniform interface between all components, the requests and responses will
// flow through. 
export default class RectangleInterfaceWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='cell-container'>
        <button className='role-button'>
          MOVE
        </button>
        <button className='role-button'>
          ROTATE
        </button>
        <RectangleInterface/>
      </div>
    );
  }
}