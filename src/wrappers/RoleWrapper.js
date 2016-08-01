import React from 'react';
import ConnectionStore from '../stores/ConnectionStore';
import UserStore from '../stores/UserStore';
import AssignRoles from '../components/AssignRoles';
import { socket } from '../socket';

export default function RoleWrapper(Component, roles) {
  return class ComponentWithAssignedRoles extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        roles,
        view: undefined
      };
      this.handleAddConnectionToRole = this.handleAddConnectionToRole.bind(this);
      this.updateConnections = this.updateConnections.bind(this);
    }

    componentDidMount() {
      ConnectionStore.addChangeListener(this.updateConnections);
      socket.on('roleAssignment', (d) => {
        let role = d.role;
        this.setState({
          view: role
        });
        socket.emit('roleAck', {
          role: d.role
        });
      });

      socket.on('roleAck', (data) => {
        console.log('Received role acknowledgement', data);
      });
    }

    componentWillUnmount() {
      ConnectionStore.removeChangeListener(this.updateConnections);
      socket.off('roleAssignment');
      socket.off('roleAck');
    }

    render() {
      let connections = Object.keys(ConnectionStore.clients).map((k) => ConnectionStore.clients[k]);
      return (
        <div>
          <Component {...this.props} 
            roles={this.state.roles}
            view={this.state.view}/>
          {UserStore.isMaster && (<AssignRoles
            roles={this.state.roles}
            connections={connections}
            addConnectionToRole={this.handleAddConnectionToRole}
          />)}
        </div>
      );
    }
    handleAddConnectionToRole(role, connection) {
      let roles = this.state.roles;
      roles.forEach(function(r) {
        if (r.label === role.label) {
          // Emit messages accordingly
          if (UserStore.isMaster) {
            socket.emit('assignRole', {
              targetId: connection.clientId,
              role: role.label.toLowerCase()
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
    updateConnections() {
      let connections = Object.keys(ConnectionStore.clients).map((k) => ConnectionStore.clients[k]);
      this.state.roles.forEach((role) => {
        let activeConns = [];
        role.assignedConnections.forEach((c, i) => {
          if (ConnectionStore.clients[c.user.email] !== undefined) {
            activeConns.push(c);
          }
        });
        role.assignedConnections = activeConns;
      });
      this.forceUpdate();
    }
  };
};