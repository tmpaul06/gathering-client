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
import objectAssign from 'object-assign';

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

function getRoles(roleType) {
  let roles = roleType === 'CS' ? csRoles : mrRoles;
  // Return a clone!
  return roles.map((role) => {
    return objectAssign({}, role, {
      assignedConnections: []
    });
  });
}

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
            <div style={{ opacity: 0.5 }}>
              <p>Scalability of component interactions</p>
              <p>Generality of interfaces</p>
              <p>Independent deployment of components</p>
              <p>Enforce security</p>
              <p>Encapsulate legacy systems</p>
            </div>
          </Slide>
          <Slide>
            <h3>Time travel</h3>
            <h5>The Internet</h5>
            <h5 style={{ color: 'orange' }}>World Wide Web</h5>
            <h5 className='ppt-title'>1960 - 2016</h5>
          </Slide>
          <Slide className='slide-container'>
            <h3>Trivia primer</h3>
            <h4>You will see a question on the screen</h4>
            <h5 style={{ color: '#1EB546' }}>If you know the answer, type it in</h5>
            <h5>If you do not know the answer, press any character on the keyboard</h5>
            <h5>If the character is present in the answer, it will show up</h5>
            <p>Speed matters!!!</p>
          </Slide>
          <Slide className='slide-container'>
            <TriviaWrapper
              question='What is the internet`s precursor known as ?'
              answer='ARPANET'
            />
          </Slide>
          <Slide>
            <h3>History of the Internet</h3>
            <p>ARPANET - developed during 60s - 70s, backed by Packet Switching</p>
            <p>ARPANET, academic and military networks in the 1980s</p>
            <h4>Internet</h4>
            <p>Internetworking - network of networks</p>
            <p>Global system of interconnected computer networks</p>
            <p>Uses Internet protocol suite (TCP/IP)</p>
          </Slide>
          <Slide className='slide-container'>
            <TriviaWrapper
              imageUrl='tim_b_lee.jpg'
              question='Who invented the World Wide Web ?'
              answer='Tim Berners Lee'
            />
          </Slide>
          <Slide className='slide-container'>
            <h4>Onto World Wide Web</h4>
            <blockquote>
              <span className='text'>
                “In those days, there was different information on different computers, but you had to log on to different computers to get at it. Also, sometimes you had to learn a different program on each computer. Often it was just easier to go and ask people when they were having coffee…”
              </span>
              <span className='author'>
                Tim Berners Lee
              </span>
            </blockquote>
            <p>HTML: HyperText Markup Language. The markup (formatting) language for the Web.</p>
            <p>URI: Uniform Resource Identifier - Address of a resource</p>
            <p>HTTP: Hypertext Transfer Protocol.</p>
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
          <Slide className='slide-container'>
            <TriviaWrapper
              question='Who is the author of the REST architecture ?'
              answer='Roy Fielding'
            />
          </Slide>
          <Slide>
            <h3>Client-Server</h3>
            <h5>Client</h5>
            <p>An agent that makes a request</p>
            <h5>Server</h5>
            <p>An agent that processes request</p>
            <h5 style={{ color: '#7C52B3' }}>Why?</h5>
            <p>Separation of concerns</p>
          </Slide>
          <Slide className='slide-container'>
            <h3>Stateless</h3>
            <h4>But what does stateful communication mean ?</h4>
            <h5>Remember the context from previous requests</h5>
          </Slide>
          <Slide className='slide-container'>
            <h4>Stateful communication</h4>
            <p>For example, human beings</p>
            <ChatBox otherName='Human'/>
          </Slide>
          <Slide className='slide-container'>
            <h4>Stateless communication</h4>
            <p>For example, bots</p>
            <BotChatWrapper otherName='Twain The Pain'/>
          </Slide>
          <Slide>
            <ClientServerWrapper roles={getRoles('CS')} serverType='stateful'/>
          </Slide>
          <Slide>
            <ClientServerWrapper roles={getRoles('CS')} serverType='stateless'/>
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
            <div style={{ opacity: 0.2 }}>
              <p>Self descriptive messages</p>
              <p>Use of hypermedia as engine of application state (HATEOAS)</p>
            </div>
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
            <h5>URI - Uniform Resource Identifier</h5>
            <p>A string of characters that identifies a resource</p>
            <p>URL - The location, e.g address of library</p>
            <p>URN - The name of the resource, e.g ISBN number</p>
            <h5 style={{ color: '#1EB546', background: 'rgba(0,0,0,0.1)', padding: 10 }}>
              scheme:[host[:port]][/]path[?query][#fragment]
            </h5>
            <p>e.g http://www.abc.com/day/2/news?lang=en#section2</p>
            <span style={{ color: 'purple' }}>Access the resource located at `day/2/news`, set language to english,
            go to section 2</span>
          </Slide>
          <Slide className='slide-container'>
            <h4>Representations</h4>
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
          <Slide>
            <RectangleInterface/>
          </Slide>
          <Slide className='slide-container'>
            <h4>2. Manipulation of resources</h4>
            <h5>Direct Manipulation</h5>
            <p>Full control over implementation</p>
            <p>Done locally</p>
            <div style={{ opacity: 0.3 }}>
              <h5>Manipulation through representation</h5>
              <p>Can choose any convenient representation dynamically</p>
              <p>Can be done remotely</p>
            </div>
          </Slide>
          <Slide>
            <RectangleRemoteManipulationWrapper roles={getRoles('MR')}/>
          </Slide>
          <Slide className='slide-container'>
            <h4>2. Manipulation of resources</h4>
            <div style={{ opacity: 0.3 }}>
              <h5>Direct Manipulation</h5>
              <p>Full control over implementation</p>
              <p>Done locally</p>
            </div>
            <h5>Manipulation through representation</h5>
            <p>Can choose any convenient representation dynamically</p>
            <p>Can be done remotely</p>
          </Slide>
          <Slide className='slide-container'>
            <h4>2. Manipulation of resources</h4>
            <p>All elements must understand the interface and agree to operate accordingly</p>
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