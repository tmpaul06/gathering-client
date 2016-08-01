import React from 'react';
import RoundRobinDispatcher from '../dispatchers/RoundRobinDispatcher';
import { socket } from '../socket';
/*
  Simulates a client server interaction with a round robin
  dispatcher in between. A master client will set this topology
  and assign clients and servers.
 */
export class ClientServerTopology extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      servers: []
    };
    this.dispatcher = new RoundRobinDispatcher();
    this.handleRoleAck = this.handleRoleAck.bind(this);
    this.handleRoleDisconnect = this.handleRoleDisconnect.bind(this);
  }
  componentDidMount() {
    socket.on('roleAck', this.handleRoleAck);
    socket.on('roleDisconnect', this.handleRoleDisconnect)
  }
  componentWillUnmount() {
    socket.off('roleAck', this.handleRoleAck);
    socket.off('roleDisconnect', this.handleRoleDisconnect) 
  }
  /**
   * Return a graph layout using d3
   * with links between client -> dispatcher
   * and then dispatcher to server.
   * @return {ReactElementTree}
   */
  render() {

  }
  handleRoleAck(data) {
    // Change status to green
    let role = data.role;
    let connId = data.target;
    let key = role + 's';
    let target = this.state[key];
    target.forEach((t) => {
      if (t.connection.id === connId) {
        t.status = 'GREEN';
      }
    });
    this.setState({
      [key]: target
    });
  }
  handleRoleDisconnect(connId) {
    // Change status to red. Master can remove it from role.
    let role = data.role;
    let connId = data.target;
    let key = role + 's';
    let target = this.state[key];
    target.forEach((t) => {
      if (t.connection.id === connId) {
        t.status = 'RED';
      }
    });
    this.setState({
      [key]: target
    });
  }
  /**
   * Add a new connection for the given role (i.e client or server)
   * Although a dispatcher can be assigned to some client, we let the
   * master handle all dispatch. ;)
   * 
   * @param {Object} connection The socket connection information object
   * @param {String} role       The role this socket connection target should play
   */
  add(connection, role) {
    // Send a role assignment packet over websocket, and wait for acknowledgement.
    // If ack fails, then the add will fail.
    let key = role + 's';
    let target = this.state[key];
    // Set yellow state on client until ack arrives
    target.push({
      connection,
      status: 'YELLOW'
    });
    this.setState({
      [key]: targets
    }, () => {
      socket.emit('assignRole', {
        role,
        target: connection.id
      });
    });
  }
  remove(connection) {

  }
  send(sourceConnectionId, data) {
    // Each machine in the network has a specific role: client, server or dispatcher.
    // If a message starts from a client, it is forwarded onto master(dispatcher) which
    // then forwards it in a round robin fashion to new servers. The backend server will
    // take care of routing messages to master which can then decide where to forward it.
    
    // Each dispatcher maintains a list of requests that it received, and then forwards it
    // to the appropriate server. It also returns failed state and timeout if server does
    // not reply.
    
  }
  receive(remoteConnectionId, data) {
    // data._route contains the necessary fowarding information
  }
}