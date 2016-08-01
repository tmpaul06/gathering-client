import React from 'react';

export default class VerticalList extends React.Component {
  render() {
    let items = this.props.items || [];
    return (
      <ul className='vertical-list'>
        {items.map((item, i) => {
          return (<li key={i} className='vertical-list-item'>{item}</li>);
        })}
      </ul>
    );
  }
}