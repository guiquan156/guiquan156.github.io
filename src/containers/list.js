const List = require('../components/list');
const { connect } = require('react-redux');
const { getListActionAsync, getListAction } = require('../actions/action.js');
const React = require('react');
// require('core-js/fn/object/assign');
// require('core-js/fn/object/is');

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
		let {dispatch, list, listCat} = this.props;
		if(this.props.params.listType == 'all')
			if(Object.keys(list).length == 0)
				dispatch(getListActionAsync(1));
			else return;
		else
			if(Object.keys(listCat) == 0)
				dispatch(getListActionAsync(0));
			else return;
	}
}

function aaa(state){
	return {
		list: state.list,
		listCat: state.listCat
	}
}

module.exports = connect(aaa)(ListContainer);