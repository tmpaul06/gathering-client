import React from 'react';
import UserStore from '../stores/UserStore';
import ConnectionStore from '../stores/ConnectionStore';
import AssignRoles from '../components/AssignRoles';
import { socket } from '../socket';
/**
 * Simulates a client-server interaction. The interaction can either
 * be stateful or stateless. Demonstrates the stateless constraint
 * imposed by REST
 *
 * The master can designate a given connection as client, and another
 * connection as server. The master can also function as a client OR
 * a server.
 *
 * The master will inform the backend with the set of socket ids
 * that belong to each room. When multiple servers are present,
 * a round-robin dispatch is used between each server connection.
 * 
 */
export default class ClientServerWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: undefined,
      messages: {},
      roles: [ {
        label: 'Client',
        count: 1,
        assignedConnections: []
      }, {
        label: 'Server',
        count: 1,
        assignedConnections: []
      } ]
    };
    this.handleAddConnectionToRole = this.handleAddConnectionToRole.bind(this);
    this.makeClientRequest = this.makeClientRequest.bind(this);
  }

  componentDidMount() {
    socket.on('clientAssignment', () => {
      // Set client state
      this.setState({
        view: 'client'
      });
    });

    socket.on('serverAssignment', () => {
      this.setState({
        view: 'server'
      });
    });

    socket.on('clientMessage', (d) => {
      let messages = this.state.messages || {};
      messages[d._clientId] = d.body;
      // Show the message coming in from the client with the given id
      console.log('Client message', d);
      this.setState({
        messages
      });
      socket.emit('clientMessageForward', d);
    });
  }

  getRegularView() {
    let connections = Object.keys(ConnectionStore.clients).map((k) => ConnectionStore.clients[k]);
    // Run over the roles and assigned connections and populate the state
    // of each of them from the message field on component state
    let clientServerComponents = [];
    this.state.roles.forEach((role) => {
      role.assignedConnections.forEach((c) => {
        clientServerComponents.push({
          type: role.label,
          id: c.clientId,
          name: c.user.name,
          state: this.state.messages ? this.state.messages[c.clientId] : undefined
        });
      });
    });
    return (
      <div>
        {UserStore.isMaster && (<AssignRoles
          roles={this.state.roles}
          connections={connections}
          addConnectionToRole={this.handleAddConnectionToRole}
        />)}
        {clientServerComponents.map((c) => {
          return (
            <pre key={c.id}>
              {JSON.stringify({
                type: c.type,
                name: c.name,
                message: c.state
              })}
            </pre>
          );
        })}
      </div>
    );
  }

  getServerView() {
    return (
      <div>
        <p>Request body</p>
        <span>{this.state.request}</span>
        <button>Respond</button> 
      </div>
    );
  }

  getClientView() {
    return (
      <div>
        <button onClick={this.makeClientRequest}>Make Request</button> 
        <input type='text'
          defaultValue='' 
          placeholder='Enter some text...'
          ref='clientInput'/>
        {this.state.responseFromServer && (
          <div>
            <p>Response</p>
            <span>{this.state.responseFromServer}</span>
          </div>)}
      </div>
    );
  }

  getView() {
    if (this.state.view === 'client') {
      return this.getClientView();
    } else if (this.state.view === 'server') {
      return this.getServerView();
    } else {
      return this.getRegularView();
    }
  }

  makeClientRequest() {
    let inputValue = this.refs.clientInput.value;
    console.log('Emitting', inputValue);
    // Send this to server
    socket.emit('clientMessage', {
      body: inputValue
    });
  }

  render() {
    return (<div>
      {this.getView()}
    </div>);
  }

  handleAddConnectionToRole(role, connection) {
    let roles = this.state.roles;
    roles.forEach(function(r) {
      if (r.label === role.label) {
        // Emit messages accordingly
        if (UserStore.isMaster) {
          socket.emit('assign' + r.label, {
            id: connection.clientId
          });
        }
        r.assignedConnections = r.assignedConnections || [];
        r.assignedConnections.push(connection);
      }
    });
    this.setState({
      roles
    });
  }
}