//reducer

import { combineReducers } from 'redux';

//state 必须要要默认值？？？？
function addTodo(state=[], action){
	const nextState = [...state];
	switch(action.type){
		case 'ADD_TODO':  //增加
			nextState.push({text: action.text, isCompleted: false});
			return nextState;

		case 'COMPLETE_TODO': //完成！
			nextState[action.index].isCompleted = true;
			return nextState;

		default: 
			return state; //reducer一定要放回state无论如何！！！
	}
}

function filter(state='SHOW_ALL', action){
	switch(action.type){
		case 'SHOW_ALL':
			return 'SHOW_ALL';

		case 'SHOW_COMPLETED':
			return 'SHOW_COMPLETED';

		case 'SHOW_NO_COMPLETED': 
			return 'SHOW_NO_COMPLETED';

		default: 
			return state;
	}
}

//todo 测试异步
function inc(state=0, action){
	if(action.type === 'INC'){
		return ++state;
	}else{
		return state;
	}
}


const todoApp = combineReducers({
	todos: addTodo,
	filter,
	counter: inc
});


export default todoApp; 
