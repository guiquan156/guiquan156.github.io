//action
function todoAddAction(text){
	var result = {
		type: 'ADD_TODO',
		text
	}
	return result;
}

function completeTodo(index){
	var result = {
		type: 'COMPLETE_TODO',
		index
	}
	return result;
}


export { todoAddAction, completeTodo };

