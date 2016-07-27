// The actual slides go here
import React from 'react';
import Slide from './Slide';
import Slides from './Slides';
import TriviaWrapper from './wrappers//TriviaWrapper';
import ClientServerWrapper from './wrappers/ClientServerWrapper';

export default class Presentation extends React.Component {
  render() {
    return (
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
        <Slide>
          <ClientServerWrapper serverType='stateless'/>
        </Slide>
      </Slides>
    );
  }
};