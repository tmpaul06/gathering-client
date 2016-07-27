import React from 'react';

export default class AssignRoles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let roles =  this.props.roles || [];
    // The array of connections at the moment
    let connections = this.props.connections || [];
    return (
      <div>
        {
          /*
            Render each role as a big button that when clicked will
            call a randomized algorithm to choose connections to assign
            for each role
          */
        }
        <div>Total connections: {connections.length}</div>
        {roles.map((role, i) => {
          return (<button key={role.label} style={{
            background: role.color
          }} className='role-button' onClick={() => this.assignRole(role)}>
            {role.label + ' (' + role.assignedConnections.length + ')'}
          </button>);
        })}
      </div>
    );
  }

  assignRole(role) {
    // Randomly pick a connection that is not already assigned
    // and assign a role to it. If each role has its count satisfied,
    // then do not assign any.
    let assignedConnectionIds = {};
    let roles = this.props.roles || [];
    let connections = this.props.connections || [];
    roles.forEach(function(role) {
      role.assignedConnections.forEach(function(c) {
        assignedConnectionIds[c.clientId] = true;
      });
    });
    let otherConnections = connections.filter((f) => {
      return assignedConnectionIds[f.clientId] === undefined;
    });
    if (role.assignedConnections.length >= role.count) {
      return;
    } else {
      let randomConnection = this.getRandomConnection(otherConnections);
      if (randomConnection) {
        this.props.addConnectionToRole(role, randomConnection);
      }
    }
  }

  getRandomConnection(connections) {
    let len = connections.length;
    if (len === 0) {
      return null;
    }
    let i = Math.floor(Math.random() * len);
    return connections[i];
  }
};