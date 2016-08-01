import React from 'react';
/**
 *  A slide page listens to keypress events, and reveals
 *  section after section. When no more sections are pending
 *  we simply call the parent callback and move on to next
 *  page
 */
export default class Slide extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    if (!e.defaultPrevented) {
      let keyCode = e.keyCode;
      let childCount = React.Children.count(this.props.children);
      if (keyCode === 37) {
        // Left arrow key
        if (this.props.sectionIndex > 0) {
          this.props.onPreviousSection();
        } else {
          this.props.onPreviousSlide();
        }
      } else if (keyCode === 39) {
        // Right arrow key
        if (this.props.sectionIndex < (childCount - 1)) {
          this.props.onNextSection();
        } else {
          this.props.onNextSlide();
        }
      }
    }
  }

  render() {
    return (
      <div className={'slide ' + (this.props.className || '')}>
        {React.Children.map(this.props.children, (child, i) => {
          // Each child is a Section component
          if (i <= this.props.sectionIndex) {
            return child;
          }
          return undefined;
        })}
      </div>
    );
  }
}