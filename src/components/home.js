const { Link } = require('react-router');
const React = require('react');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

//Home
class Home extends React.Component {
	render() {
		return (
			<ReactCSSTransitionGroup
				transitionName="page"
				transitionAppearTimeout={500}
				transitionAppear={true}
  				transitionEnter={false}
				transitionLeave={false}>
				<div className="content_wrap">
					<a href="#"><img src={require('../asserts/img/avatar.jpg')} className="photo"/></a>
					<p>guiquan156</p>
					<div className="main_entry">
						<Link to="/list/all">全部</Link>
						<Link to="/list/cat">分类</Link>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

module.exports = Home;