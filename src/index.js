import React from 'react';
import { Component }from 'react';
import { render } from 'react-dom';
import Test from './module.js';

class Haha extends React.Component {
  render(){
    return (
      <div>
        <p>12</p>
        {this.props.children}
      </div>
    )
  }
}


render(
  <Haha>
    <Test />
  </Haha>,
  document.getElementById('app')
);
