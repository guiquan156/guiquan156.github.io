require('./index.less');

//poyfill
require('core-js/fn/promise');
require('fetch-detector');
require('fetch-ie8');

const React = require('react');
const ReactDOM = require('react-dom');
const { Router, Route, hashHistory, IndexRoute } = require('react-router');
const { createStore, applyMiddleware } = require('redux');
const { Provider } = require('react-redux');
const thunk = require('redux-thunk').default;

const App = require('./components/app');
const Home = require('./components/home');
const List = require('./containers/list');
const Artical = require('./containers/artical.js');

const reducer = require('./reducers/reducer.js');

//中间件测试
const logger = store => next => action => {
	console.log('dispatching', action);
	let result = next(action);
	console.log('next state', store.getState());
	return result;
}

const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore);//加入异步中间件
const store = createStoreWithMiddleware(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); //使用redux开发工具

ReactDOM.render(
	<Provider store={store}>
	    <Router history={hashHistory}>
	      <Route path='/' component={App}>
	        <IndexRoute component={Home}/>
	        <Route path='/list/:listType' component={List} />
	        <Route path='/page/:id' component={Artical} />
	      </Route>
	    </Router>
    </Provider>,
  	document.getElementById('app')
);
