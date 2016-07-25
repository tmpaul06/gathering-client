import React from 'react';

/**
 *  A slide page listens to keypress events, and reveals
 *  section after section. When no more sections are pending
 *  we simply call the parent callback and move on to next
 *  page
 */
export default class SlidePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionIndex: 0
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    let keyCode = e.keyCode;
    let childCount = React.Children.count(this.props.children);
    if (keyCode === 37) {
      // Left arrow key
      if (this.state.sectionIndex > 0) {
        this.setState({
          sectionIndex: this.state.sectionIndex - 1
        });
      } else {
        if (this.props.onPrevious) {
          this.props.onPrevious();
        }
      }
    } else if (keyCode === 39) {
      // Right arrow key
      if (this.state.sectionIndex < (childCount - 1)) {
        this.setState({
          sectionIndex: this.state.sectionIndex + 1
        });
      } else {
        if (this.props.onNext) {
          this.props.onNext();
        }
      }
    }
  }

  render() {
    return (
      <div>
        {React.Children.map(this.props.children, (child, i) => {
          // Each child is a Section component
          if (i <= this.state.sectionIndex) {
            return child;
          }
          return undefined;
        })}
      </div>
    );
  }
}