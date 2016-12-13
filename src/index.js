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


ReactDOM.render(
  <Haha>
    <Test />
  </Haha>,
  document.getElementById('app')
);
