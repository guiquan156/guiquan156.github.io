const { combineReducers } = require('redux');
const { UPDATE_LIST, UPDATE_LIST_CAT, ADD_ARTICAL, UPDATE_BLOG_INFO } = require('../actions/action.js');

// import 'core-js/fn/object/assign';

function getList(state=[], action){
	switch(action.type){
		case UPDATE_LIST:
			return action.list;
		default:
			return state;
	}
}

function getListCat(state={}, action){
	switch(action.type){
		case UPDATE_LIST_CAT:
			return action.listCat;
		default: 
			return state;
	}
}

function addArtical(state=[], action){
	switch(action.type){
		case ADD_ARTICAL: 
			return [...state, action.result];
		default:
			return state;
	}
}

function updateBlogInfo(state={}, action){
	switch(action.type){
		case UPDATE_BLOG_INFO:
			return action.blogInfo;
		default:
			return state;
	}
}

module.exports = combineReducers({
	list: getList,
	listCat: getListCat,
	articals: addArtical,
	blogInfo: updateBlogInfo
});

