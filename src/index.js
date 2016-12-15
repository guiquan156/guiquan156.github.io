require('./index.less');

const React = require('react');
const ReactDOM = require('react-dom');
const { Router, Route, hashHistory, IndexRoute } = require('react-router');
const { createStore, applyMiddleware } = require('redux');

const App = require('./components/app');
const Home = require('./components/home');


// ReactDOM.render(
//     <Router history={hashHistory}>
//       <Route path='/' component={App}>
//         <IndexRoute component={Home}/>
//         <Route path='/list/:listType' component={Home} />
//       </Route>
//     </Router>,
//   document.getElementById('app')
// );

ReactDOM.render(
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}/>
      </Route>
    </Router>,
  document.getElementById('app')
);

// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );

