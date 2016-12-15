const { Link } = require('react-router');
const React = require('react');

class TopNav extends React.Component {
	render() {
		return (
			<div className="nav_top">
				<Link to="/" className="nav_home_link">guiquan156</Link>
			</div>
		);
	}
}

module.exports = TopNav;