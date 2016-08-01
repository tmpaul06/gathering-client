import React from 'react';

export default class SingleChoice extends React.Component {
  constructor(props) {
    super(props);
    // If props.handleRadioSelect is defined, this is
    // a controlled component.
    if (this.props.handleRadioSelect) {
      this.state = {
        timer: Date.now()
      }
    } else {
      this.state = {
        selectedChoice: props.selectedChoice,
        timer: Date.now()
      };
    }
  }

  render() {
    let choices = this.props.choices || [];
    return (
      <div>
        {choices.map((c, i) => {
          return (<div className='input-radio-group' key={i}>
            <input
            id={'input' + c}
            name='someChoice' 
            type='radio'
            checked={this.isChecked(c)}
            onChange={this.handleRadioSelect.bind(this, c)}
            value={c}/>
            <label htmlFor={'input' + c}>{c}</label>
          </div>);
        })}
        {(this.props.handleRadioSelect === undefined) && 
          (<button onClick={()=> this.onSubmit()}>SUBMIT</button>)
        }
      </div>
    );
  }

  isChecked(choice) {
    return choice === (this.props.handleRadioSelect ? this.props.selectedChoice : this.state.selectedChoice);
  }

  handleRadioSelect(choice) {
    if (this.props.handleRadioSelect) {
      let timeTaken = Date.now() - this.state.timer;
      this.props.handleRadioSelect(choice, timeTaken);
    } else {
      this.setState({
        selectedChoice: choice
      });
    }
  }

  onSubmit() {
    // Timestamp the solution so that the server can do an accurate scoring
    let timeTaken = Date.now() - this.state.timer;
    this.props.onSubmit(this.state.selectedChoice, timeTaken);
  }
}