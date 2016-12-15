const { Link } = require('react-router');
const React = require('react');

//Home
class Home extends React.Component {
	render() {
		return (
			<div className="content_wrap">
				<a href="#"><img src={require('../asserts/img/avatar.jpg')} className="photo"/></a>
				<p>guiquan156</p>
				<div className="main_entry">
					<Link to="/list/all">全部</Link>
					<Link to="/list/cat">分类</Link>
					<Link to="/test">test</Link>
				</div>
			</div>
		);
	}
}

module.exports = Home;