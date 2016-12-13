import Test from './module.js';
// import ReactDOM from 'react-dom';

class Haha extends React.Component {
  render(){
    return (
      <div>
        <p>121</p>
        {this.props.children}
      </div>
    )
  }
}

ReactDOM.render(
  <Haha>
    <Test />
  </Haha>,
  document.getElementById('app')
);
