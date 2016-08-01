import React from 'react';
import RoleWrapper from './RoleWrapper';
import { socket } from '../socket';
import ConnectionStore from '../stores/ConnectionStore';
import UserStore from '../stores/UserStore';
import ParagraphText from '../components/ParagraphText';
import text from '../data/paragraph';
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
class ClientServerWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paragraphOffset: 0,
      messages: {}
    };
    this.makeClientRequest = this.makeClientRequest.bind(this);
  }

  componentDidMount() {
    socket.on('serverMessage', (d) => {
      if (this.props.view === 'client') {
        return this.setState({
          responseFromServer: {
            text: d.text
          }
        });
      }
      let messages = this.state.messages || {};
      messages[d._serverId] = d.text.slice(0, 50) + '...';
      // Show the message coming in from the client with the given id
      this.setState({
        messages
      });
      socket.emit('serverMessageForward', d);
    });

    socket.on('clientMessage', (d) => {
      if (this.props.view === 'server') {
        // If current user is a server, then set requestFromClient field
        // on state
        return this.setState({
          requestFromClient: d
        });
      } else if (this.props.view === 'client') {
        // If current user is a client, then set responseFromServer field
        // on state
        return this.setState({
          responseFromServer: d
        });
      }
      let messages = this.state.messages || {};
      messages[d._clientId] = d.body;
      // Show the message coming in from the client with the given id
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
    let roles = this.props.roles || [];
    roles.forEach((role) => {
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
        <div className='cell-container'>
          {clientServerComponents.map((c) => {
            return (
              <div key={c.id} className={'cell' + ' ' + c.class.toLowerCase()}>
                <span className='title'>{c.name}</span>
                <pre>
                  {JSON.stringify(c.state, null, 2)}
                </pre>
              </div>
            );
          })}
        </div>
        {!UserStore.isMaster && (<ParagraphText 
          paragraphs={text.paragraphs}
        />)}
      </div>
    );
  }

  getServerView() {
    // If this is a stateful server, it will store the state from
    // each response, and use it to respond to next set of requests
    
    // For the stateful case, we simulate a file read operation. Each
    // request from the client will incrementally be given new paragraphs
    // from the file(text) in case of stateful server.
    
    // For a stateless server, the client has to send the paragraph offset
    // which defaults to 0.
    let serverType = this.props.serverType;
    let paragraphState;
    if (serverType === 'stateful') {
      paragraphState = (<span style={{
        padding: '0px 0px 10px 0px'
      }}>Paragraph Number:&nbsp;{this.state.paragraphOffset}</span>);
    }
    return (
      <div>
        <div className='cell-container'>
          <div className='cell bg-tertiary'>
            <span className='title'>REQUEST BODY</span>
            <pre>
              {JSON.stringify(this.state.requestFromClient, null, 2)}
            </pre>
            {this.state.requestFromClient && (<button onClick={() => this.handleServerResponse()}>RESPOND</button>)}
            {paragraphState}
          </div>
        </div>
        <ParagraphText 
          paragraphs={text.paragraphs}
        />
      </div>
    );
  }

  getClientView() {
    let serverType = this.props.serverType;
    let buttonSet;
    if (serverType === 'stateful') {
      buttonSet = (<button onClick={() => this.makeClientRequest()}>Request</button>);
    } else {
      buttonSet = text.paragraphs.map((p, i) => {
        return (<button key={i} onClick={() => this.makeClientRequest(i)}>{i}</button>);
      });
    }
    return (
      <div>
        <div className='cell-container'>
          <div className='cell bg-primary'>
            <span className='title'>RESPONSE FROM SERVER</span>
            <pre>
              {JSON.stringify(this.state.responseFromServer ? this.state.responseFromServer.text.slice(0, 40) + '...' : undefined,
               null, 2)}
            </pre>
          </div>
          {buttonSet}
        </div>
      </div>
    );
  }

  getView() {
    let view = this.props.view;
    if (view === 'client') {
      return this.getClientView();
    } else if (view === 'server') {
      return this.getServerView();
    } else {
      return this.getRegularView();
    }
  }

  makeClientRequest(index) {
    // Send this to server
    socket.emit('clientMessage', {
      body: {
        paragraphNumber: index
      }
    });
    this.setState({
      responseFromServer: undefined
    });
  }

  render() {
    return (<div>
      <h5>{this.props.serverType.toUpperCase()}&nbsp;Interaction</h5>
      {this.getView()}
    </div>);
  }

  handleServerResponse() {
    let serverType = this.props.serverType;
    // If stateless, use the request from client to send the corresponding
    // paragraph
    if (serverType === 'stateless') {
      socket.emit('serverMessage', {
        _clientId: this.state.requestFromClient._clientId,
        text: text.paragraphs[this.state.requestFromClient.body.paragraphNumber]
      });
    } else {
      socket.emit('serverMessage', {
        _clientId: this.state.requestFromClient._clientId,
        _serverId: this.state.requestFromClient._serverId,
        text: text.paragraphs[this.state.paragraphOffset]
      });
      this.setState({
        paragraphOffset: this.state.paragraphOffset + 1
      });
    }
    this.setState({
      requestFromClient: undefined
    });
  }
}

export default RoleWrapper(ClientServerWrapper, [ {
  label: 'Client',
  count: 1,
  class: 'bg-tertiary',
  assignedConnections: []
}, {
  label: 'Server',
  count: 2,
  class: 'bg-primary',
  assignedConnections: []
} ]);