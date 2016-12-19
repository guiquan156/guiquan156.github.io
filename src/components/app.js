const TopNav = require('./nav');
const React = require('react');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class App extends React.Component {
	render() {
		return (
			<div>
				<ReactCSSTransitionGroup
					transitionName="page"
					transitionAppearTimeout={500}
					transitionAppear={true}
      				transitionEnter={false}
  					transitionLeave={false}>
				<TopNav />
				{this.props.children}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}

module.exports = App;
