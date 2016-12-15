const TopNav = require('./nav');
const React = require('react');

class App extends React.Component {
	render() {
		return (
			<div>
				<TopNav />
				{this.props.children}
			</div>
		);
	}
}

module.exports = App;
