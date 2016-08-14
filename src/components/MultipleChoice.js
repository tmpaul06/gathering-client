import React from 'react';

export default class MultipleChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChoices: [],
      timer: Date.now()
    };
  }

  render() {
    let choices = this.props.choices || [];
    return (
      <div>
        {choices.map((c, i) => {
          return (<div className='input-radio-group' key={i}>
            <input
            id={'input' + c}
            type='radio'
            checked={this.isChecked(c, this.state.selectedChoices)}
            onChange={this.handleRadioSelect.bind(this, c)}
            value={c}/>
            <label htmlFor={'input' + c}>{c}</label>
          </div>);
        })}
        <button>Submit</button>
        <button>Cancel</button>
      </div>
    );
  }

  isChecked(choice, choices) {
    return choices.indexOf(choice) !== -1;
  }

  handleRadioSelect(choice) {
    let selectedChoices = this.state.selectedChoices || [];
    let index = selectedChoices.indexOf(choice);
    if (index === -1) {
      selectedChoices.push(choice);
    } else {
      selectedChoices.splice(index, 1);
    }
    this.setState({
      selectedChoices
    });
  }

  onSubmit() {
    // Timestamp the solution so that the server can do an accurate scoring
    let timeTaken = Date.now() - this.state.timer;
    this.props.onSubmit(this.state.selectedChoices, timeTaken);
  }
}