import React from 'react';

export default class ParagraphText extends React.Component {
  render() {
    let paragraphs = this.props.paragraphs || [];
    return (
      <div className='paragraph-text'>
        {paragraphs.map((para, i) => {
          return (
            <div key={i}>
              <p key={i} style={{
                fontSize: 14,
                textAlign: 'justify'
              }}>{para}</p>
            </div>
          );
        })}
      </div>
    );
  }
}