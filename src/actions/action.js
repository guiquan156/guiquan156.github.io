//js
require('core-js/fn/promise');
require('fetch-detector');
require('fetch-ie8');

//get list action
//export action type 
const UPDATE_LIST = 'UPDATE_LIST';
const UPDATE_LIST_CAT = 'UPDATE_LIST_CAT';
const UPDATE_BLOG_INFO = 'UPDATE_BLOG_INFO';

const conf = {
	userName: 'lifesinger',
	repo: 'blog'
};

function getListAction(result){
	return {
		type: UPDATE_LIST,
		list: result
	}
}

function getListCatAction(result){
	return {
		type: UPDATE_LIST_CAT,
		listCat: result
	}
}

function updateBlogInfoAction(result){
	return {
		type: UPDATE_BLOG_INFO,
		blogInfo: result
	}
}

//处理githubApi返回的数据
function _simplifyResult(result) {
	var sResult = [];
	for(var i=0,len=result.length; i<len; i++){
		var obj = {}
		obj.id = result[i].number;
		obj.title = result[i].title;
		obj.date = (result[i].updated_at ? result[i].updated_at : result[i].created_at).split('T').shift();
		sResult[i] = obj;
	}
	return sResult;
}

//把数据分类
function _catSimplifiedResult(result){
	var cResult = {};

	for(var i=0,len=result.length; i<len; i++){
		//没有分类的过滤掉先
		if(!result[i].labels || result[i].labels.length == 0) continue;
		var obj = {}
		obj.id = result[i].number;
		obj.title = result[i].title;
		obj.date = (result[i].updated_at ? result[i].updated_at : result[i].created_at).split('T').shift();
		obj.cat = result[i].labels[0].name;
		cResult[obj.cat] ? cResult[obj.cat].push(obj) : (cResult[obj.cat] = [obj]);
	}

	return cResult;

}

function getListActionAsync(isAll){
	return (dispatch) => {
		fetch('https://api.github.com/repos/' + conf.userName + '/' + conf.repo + '/issues?filter=created')
			.then(res => res.json())
			.then(data => {
				dispatch(updateBlogInfoAction(data));
				dispatch(getListAction(_simplifyResult(data)));
				dispatch(getListCatAction(_catSimplifiedResult(data)));
			}).catch((err) => {
				throw err;
				alert('网络异常!');
			});
	}
}

//todo 获取整个博客信息
function updateBlogInfoActionAsync(){
	fetch('https://api.github.com/repos/' + conf.userName + '/' + conf.repo + '/issues?filter=created')
		.then(res => res.json())
		.then(data => {
			dispatch(getListAction(updateBlogInfoAction(data)));
			dispatch(getListCatAction(_catSimplifiedResult(data)));
			dispatch(getListAction(_simplifyResult(data)));
		}).catch((err) => {
			throw err;
			alert('网络异常!');
		});
}

//get artical action

const ADD_ARTICAL = 'ADD_ARTICAL';

function getArtical(result){
	return {
		type: ADD_ARTICAL,
		result : result 
	}
}

function getArticalAsync(articalId){
	console.log('getArticalAsync');
	return (dispatch) => {
		fetch('getArtical?articalId=' + articalId)
			.then(res => res.json())
			.then(data => {
				if(data.code==200) dispatch(getArtical(data.result));
				else alert(data.result);
			}).catch((err) => {
				throw err;
				alert('网络异常!');
			});
	}
}

module.exports = { UPDATE_LIST, UPDATE_LIST_CAT, ADD_ARTICAL, UPDATE_BLOG_INFO, getListActionAsync, getArticalAsync, getListAction }
