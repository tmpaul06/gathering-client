import React from 'react';

export default class LoadingPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{
        textAlign: 'center'
      }}>
        <div className='circle'></div>
        <div className='circle-small'></div>
        <div className='circle-big'></div>
        <div className='circle-inner-inner'></div>
        <div className='circle-inner'></div>
        <p className='credits'>Animation courtsey: Vasilj Milošević</p>
      </div>
    );
  }
}