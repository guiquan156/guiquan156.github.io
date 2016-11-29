import React from 'react';
import { Component }from 'react';
import { render } from 'react-dom';

class Test extends Component {
  render(){
    return (
      <div>hahah</div>
    );
  }
}

render(
  <Test />,
  document.getElementById('app')
);
