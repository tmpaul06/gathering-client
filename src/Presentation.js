// The actual slides go here
import React from 'react';
import Slide from './Slide';
import Slides from './Slides';
import TriviaWrapper from './TriviaWrapper';

export default class Presentation extends React.Component {
  render() {
    return (
      <Slides>
        <Slide>
          <h4>Hello</h4>
          <p>Next section</p>
          <div>
            <span>Yadda yadda</span>
            <span>Ahoy there sailor</span>
          </div>
        </Slide>
        <Slide>
          <TriviaWrapper
            imageUrl='tim_b_lee.jpg'
            question='Who invented the World Wide Web ?'
            answer='Tim Berners Lee'
          />
        </Slide>
      </Slides>
    );
  }
};