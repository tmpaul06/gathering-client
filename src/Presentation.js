// The actual slides go here
import React from 'react';
import Slide from './Slide';
import Slides from './Slides';
import TriviaWrapper from './wrappers//TriviaWrapper';
import ClientServerWrapper from './wrappers/ClientServerWrapper';
import RectangleInterfaceWrapper from './wrappers/RectangleInterfaceWrapper';
import RectangleRemoteManipulationWrapper from './wrappers/RectangleRemoteWrapper';
import RectangleInterface from './components/RectangleInterface';
import Background from './Background';
import VerticalList from './components/VerticalList';

export default class Presentation extends React.Component {
  render() {
    return (
      <div style={{
        height: 'inherit'
      }}>
        <Slides>
          <Slide>
            <h4>REST</h4>
            <h5>Representational State Transfer</h5>
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
            <p></p>
          </Slide>
          <Slide>
            <ClientServerWrapper serverType='stateless'/>
          </Slide>
          <Slide>
            <RectangleInterface/>
          </Slide>
          <Slide>
            <RectangleInterfaceWrapper/>
          </Slide>
          <Slide>
            <RectangleRemoteManipulationWrapper/>
          </Slide>
        </Slides>
      </div>
    );
  }
};