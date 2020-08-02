import React from 'react';

export class Lessson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 1,
    };
  }

  render() {
    return (
      <div>
        <h1>Lesson 1</h1>
        <h3>Introduction to basic commands: FRONT and ROTATE</h3>
        <p>This is a sample text</p>
      </div>
    )
  }
}