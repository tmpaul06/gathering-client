import React from 'react';
import UserStore from './stores/UserStore';
import { socket } from './socket';

export default class Slides extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      slideSectionIndex: [ 0 ]
    };
    this.handlePreviousSection = this.handlePreviousSection.bind(this);
    this.handleNextSection = this.handleNextSection.bind(this);
    this.handlePreviousSlide = this.handlePreviousSlide.bind(this);
    this.handleNextSlide = this.handleNextSlide.bind(this);
  }

  componentDidMount() {
    if (!UserStore.isMaster) {
      socket.on('masterSlideChanged', (data) => {
        this.setState({
          slideIndex: data.slideIndex,
          slideSectionIndex: data.sectionIndex
        });
      });
    }
  }

  render() {
    return (
      <div className="slides">
        {React.Children.map(this.props.children, (child, i) => {
          if (this.state.slideIndex === i) {
            return React.cloneElement(child, {
              sectionIndex: this.state.slideSectionIndex[this.state.slideIndex],
              onPreviousSection: this.handlePreviousSection,
              onNextSection: this.handleNextSection,
              onPreviousSlide: this.handlePreviousSlide,
              onNextSlide: this.handleNextSlide
            });
          }
        })}
      </div>
    );
  }

  handlePreviousSlide() {
    if (UserStore.isMaster) {
      if (this.state.slideIndex > 0) {
        let newIndex = this.state.slideIndex - 1;
        let sectionIndexArr = this.state.slideSectionIndex;
        sectionIndexArr[newIndex] = sectionIndexArr[newIndex] || 0;
        this.setState({
          slideIndex: newIndex
        });
        socket.emit('slideChange', {
          slideIndex: newIndex,
          sectionIndex: sectionIndexArr
        });
      }
    }
  }

  handleNextSlide() {
    if (UserStore.isMaster) {
      let childCount = React.Children.count(this.props.children);
      if (this.state.slideIndex < childCount - 1) {
        let newIndex = this.state.slideIndex + 1;
        let sectionIndexArr = this.state.slideSectionIndex;
        sectionIndexArr[newIndex] = sectionIndexArr[newIndex] || 0;
        this.setState({
          slideIndex: newIndex,
          slideSectionIndex: sectionIndexArr
        });
        socket.emit('slideChange', {
          slideIndex: newIndex,
          sectionIndex: sectionIndexArr
        });
      }
    }
  }

  handlePreviousSection() {
    if (UserStore.isMaster) {
      let sectionIndexArr = this.state.slideSectionIndex;
      let slideIndex = this.state.slideIndex;
      sectionIndexArr[slideIndex] = sectionIndexArr[slideIndex] - 1;
      this.setState({
        slideSectionIndex: sectionIndexArr
      });
      socket.emit('slideChange', {
        slideIndex,
        sectionIndex: sectionIndexArr
      });
    }
  }

  handleNextSection() {
    if (UserStore.isMaster) {
      let sectionIndexArr = this.state.slideSectionIndex;
      let slideIndex = this.state.slideIndex;
      sectionIndexArr[slideIndex] = sectionIndexArr[slideIndex] + 1;
      this.setState({
        slideSectionIndex: sectionIndexArr
      });
      socket.emit('slideChange', {
        slideIndex,
        sectionIndex: sectionIndexArr
      });
    }
  }
};