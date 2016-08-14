// The actual slides go here
import React from 'react';
import Slide from './Slide';
import Slides from './Slides';
import TriviaWrapper from './wrappers//TriviaWrapper';
import ClientServerWrapper from './wrappers/ClientServerWrapper';
import RectangleInterfaceWrapper from './wrappers/RectangleInterfaceWrapper';
import RectangleRemoteManipulationWrapper from './wrappers/RectangleRemoteWrapper';
import RectangleInterface from './components/RectangleInterface';
import VerticalList from './components/VerticalList';
import ChatBox from './components/ChatBox';
import BotChatWrapper from './wrappers/BotChatWrapper';

let csRoles = [ {
  label: 'Client',
  count: 1,
  class: 'bg-tertiary',
  assignedConnections: []
}, {
  label: 'Server',
  count: 2,
  class: 'bg-primary',
  assignedConnections: []
} ];

let mrRoles = [ {
  label: 'MOVE',
  class: 'bg-tertiary',
  count: 3,
  assignedConnections: []
}, {
  label: 'ROTATE',
  class: 'bg-primary',
  count: 2,
  assignedConnections: []
} ];

export default class Presentation extends React.Component {
  render() {
    return (
      <div style={{
        height: 'inherit'
      }}>
        <Slides>
          <Slide>
            <h4 className='ppt-title'>REST</h4>
            <h5 style={{
              textDecoration: 'underline'
            }}>Representational State Transfer</h5>
            <div>
              <p>An architectural style for the modern web</p>
            </div>
          </Slide>
          <Slide>
            <h4>REST&ne;HTTP</h4>
            <h4>Constraints on <strong>ELEMENTS</strong></h4>
            <p>Scalability of component interactions</p>
            <p>Generality of interfaces</p>
            <p>Independent deployment of components</p>
            <p>Enforce security</p>
            <p>Encapsulate legacy systems</p>
          </Slide>
          <Slide>
            <TriviaWrapper
              imageUrl='tim_b_lee.jpg'
              question='Who invented the World Wide Web ?'
              answer='Tim Berners Lee'
            />
          </Slide>
          <Slide className='slide-container'>
            <h4>A brief history of the Web</h4>
            <blockquote>
              <span className='text'>
              Web’s major goal was to be a shared information space
              through which people and machines could communicate.
              </span>
              <span className='author'>
                Tim Berners lee
              </span>
            </blockquote>
            <h5>Challenges</h5>
            <p>Provide a universally consistent interface to structured information</p>
            <p>Available on as many platforms as possible</p>
            <p>Incrementally deployable as new people and organizations joined the project.</p>
          </Slide>
          <Slide>
            <h4>Hypermedia - The dawn of a new age</h4>
            <h5>Hypertext</h5>
            <p>Text + <a href="">Links</a></p>
            <p>Distributed (Data stored at remote location)</p>
            <p>Easy to edit and store</p>
            <p>Mostly static</p>
          </Slide>
          <Slide>
            <h3>REST</h3>
            <h4>An architecture for distributed hypermedia systems</h4>
            <p>
              Derived by applying a series of <strong>constraints</strong> to constituent elements
            </p>
            <p>Client-Server</p>
            <p>Stateless communication</p>
            <p>Uniform Interface</p>
            <p>Caching</p>
          </Slide>
          <Slide>
            <h3>Client-Server</h3>
            <h5>Client</h5>
            <p>An agent that makes a request</p>
            <h5>Server</h5>
            <p>An agent that processes request</p>
            <h5 style={{ color: '#7C52B3' }}>Why?</h5>
            <p>Separate user interface from data storage concerns</p>
          </Slide>
          <Slide className='slide-container'>
            <h3>Stateless</h3>
            <h4>But what does stateful communication mean ?</h4>
            <h5>Remember the context from previous requests</h5>
          </Slide>
          <Slide className='slide-container'>
            <h4>Stateful communication</h4>
            <p>For example, human beings</p>
            <ChatBox/>
          </Slide>
          <Slide className='slide-container'>
            <h4>Stateless communication</h4>
            <p>For example, bots</p>
            <BotChatWrapper/>
          </Slide>
          <Slide>
            <ClientServerWrapper roles={csRoles} serverType='stateful'/>
          </Slide>
          <Slide>
            <ClientServerWrapper roles={csRoles} serverType='stateless'/>
          </Slide>
          <Slide>
            <h4>Stateless interaction</h4>
            <h5>Pros</h5>
            <p>Improved visibility for monitoring</p>
            <p>Improved recovery from partial failures</p>
            <p>Improved scalability and simplicity because server need not store state</p>
            <h5>Cons</h5>
            <p>Repetitive data transfer (Network overhead)</p>
            <p>Complex client side state management</p>
          </Slide>
          <Slide>
            <h4>Uniform Interface</h4>
            <h5 style={{ color: '#7C52B3' }}>Interface constraints</h5>
            <p>Identification of resources</p>
            <p>Manipulation of resources via representations</p>
            <p>Self descriptive messages</p>
            <p>Use of hypermedia as engine of application state (HATEOAS)</p>
          </Slide>
          <Slide className='slide-container'>
            <h4>1. Identification of resources</h4>
            <h5>Resource ?</h5>
            <blockquote>
              <span className='text'>
                A <em>resource</em> is a conceptual mapping to a set of entities.
                Any information that can be named can be a <em>resource</em>: a document or image,
                a temporal service e.g. “today’s weather in Los Angeles”
              </span>
              <span className='author'>
                Roy Fielding
              </span>
            </blockquote>
            <p>The target of the resource can vary over time</p>
            <p>
              For e.g, "current president of the United States" is a resource,
              the value it maps to can vary over time.
            </p>
            <h5>Resource Identifier</h5>
          </Slide>
          <Slide className='slide-container'>
            <h4>1. Identification of resources</h4>
            <h5>Representations</h5>
            <blockquote>
              <span className='text'>
                A representation is a sequence of bytes, plus representation metadata to 
                describe those bytes.
              </span>
              <span className='author'>
                Roy Fielding
              </span>
            </blockquote>
            <p>Document, File, HTTP Message entity etc</p>
            <p>Metadata is in the form of name-value pairs, where the name corresponds to a standard
that defines the value’s structure and semantics</p>
          </Slide>
          <Slide className='slide-container'>
            <h4>2. Manipulation of resources</h4>
            <h5>Direct Manipulation</h5>
            <p>Full control over implementation</p>
            <p>Done locally</p>
            <h5>Manipulation through representation</h5>
            <p>Can choose any convenient representation dynamically</p>
            <p>Can be done remotely</p>
          </Slide>
          <Slide>
            <RectangleInterface/>
          </Slide>
          <Slide>
            <RectangleRemoteManipulationWrapper roles={mrRoles}/>
          </Slide>
          <Slide className='slide-container'>
            <h4>2. Manipulation of resources</h4>
            <p>All elements must understand the interface</p>
            <p>Implementation details are irrelevant</p>
            <h5>Uniformity of interface</h5>
            <h5>e.g HTTP GET, POST, PUT, DELETE</h5>
          </Slide>
          <Slide>
            <h4>Uniform Interface</h4>
            <h5>Pros</h5>
            <p>Implementations are decoupled from their services</p>
            <p>Allows independent evolution of components</p>
            <p>Promotes loose coupling</p>
            <h5>Cons</h5>
            <p>Degrades efficiency</p>
          </Slide>
          <Slide>
            <h4>Caching</h4>
            <h5>Explicity state if response is cacheable or not</h5>
            <p>Eliminates repetitive queries to the server</p>
            <p>Improves latency</p>
            <h5 style={{
              color: 'orange'
            }}>Caution! Data may be stale</h5>
          </Slide>
        </Slides>
      </div>
    );
  }
};