import React from 'react';
import SingleChoice from './SingleChoice';
import MultipleChoice from './MultipleChoice';

export default class QuestionAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerStats: props.choices ? props.choices.map((c) => {
        return { count: 0 };
      }) : []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.choices !== this.props.choices) {
    //   this.setState({
    //     answerStats: nextProps.choices.map((c) => {
    //       return { count: 0 };
    //     })
    //   });
    // }
  }

  componentDidMount() {
    // Add socket listeners
  }

  componentWillUnmount() {
    // Remove socket listeners
  }

  render() {
    let { question, choices, multiple } = this.props;
    // Render a question, choices (single/multiple)
    return (<div>
      <p>{question}</p>
      {multiple ? 
        (<MultipleChoice 
          choices={choices}
          onSubmit={this.handleSubmit}/>) : 
        (<SingleChoice
          choices={choices}
          onSubmit={this.handleSubmit}
          />)
      }
    </div>);
  }

  handleSubmit(answer, time) {
    let correctChoices = this.props.correctChoices;
    // // In case anyone wants to snoop in and read props from React tab,
    // // we shift it by length of choices.
    // let nChoices = this.props.choices.length;
    // let indexes = correctChoices.map((c) => {
    //   return nChoices - 1 - c;
    // });
    let multiple = this.props.multiple;
  }
}