const List = require('../components/list');
const { connect } = require('react-redux');
const { updateBlogInfoActionAsync } = require('../actions/action.js');
const React = require('react');

class ListContainer extends React.Component {
	render(){
		let  {dispatch, list, listCat} = this.props;
		return (
			<div>
				<List listType={this.props.params.listType} list={list} listCat={listCat}/>
			</div>
		);
	}
	componentWillMount(){
		let { dispatch, list, listCat, blogInfo } = this.props;

		if(blogInfo.length == 0) dispatch(updateBlogInfoActionAsync());
	}
}

module.exports = connect(state => {
	return {
		list: state.list,
		listCat: state.listCat,
		blogInfo: state.blogInfo
	}
})(ListContainer);
