import React from 'react';

export default class GuessText extends React.Component {
  //**********************************************
  // Constructor
  //**********************************************
  constructor(props) {
    super(props);
    this.state = {
      typedChars: {}
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  //**********************************************
  // React methods
  //**********************************************
  componentWillMount() {
    document.addEventListener('keypress', this.handleKeyDown);
    this.timer = Date.now();
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyDown);
  }

  render() {
    let styles = this.getStyles();
    let answer = this.props.answer || '';
    let charArray = this.toCharArray(answer);
    let typedChars = this.state.typedChars;
    return (
      <div style={styles.container}>
        {charArray.map((c, i) => {
          return (<span key={i} className="answer-letter">
            {(typedChars[c] || typedChars[c.toLowerCase()] || c === ' ') ?
            (<span>{c}</span>): (<span style={styles.unknown}>&nbsp;</span>)}
          </span>);
        })}
      </div>
    );
  }

  handleKeyDown(e) {
    let code = e.keyCode || e.which;
    let char = String.fromCharCode(code);
    let typedChars = this.state.typedChars;
    typedChars[char] = true;
    this.setState({
      typedChars
    });
    // Check if all the characters in the answer are present
    // in typed chars.
    let correct = true;
    let answer = this.props.answer || '';
    let charArray = this.toCharArray(answer);
    charArray.forEach(function(c) {
      let lower = c.toLowerCase();
      if (lower !== ' ' && typedChars[lower] === undefined) {
        correct = false;
      }
    });
    if (correct && this.props.onCorrectAnswer) {
      document.removeEventListener('keypress', this.handleKeyDown);
      this.props.onCorrectAnswer(Date.now() - this.timer);
    }
  }

  toCharArray(string) {
    let arr = [];
    for(let i = 0; i < string.length; i++) {
      arr.push(string[i]);
    }
    return arr;
  }

  getStyles() {
    return {
      container: {
        fontSize: 80,
        fontFamily: 'Monospace'
      },
      letter: {
        margin: '0px 10px',
        color: 'rgb(72, 72, 72)'
      },
      unknown: {
        textDecoration: 'underline'
      }
    };
  }
}