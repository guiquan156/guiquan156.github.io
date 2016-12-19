
//常量
const UPDATE_LIST = 'UPDATE_LIST';
const UPDATE_LIST_CAT = 'UPDATE_LIST_CAT';
const UPDATE_BLOG_INFO = 'UPDATE_BLOG_INFO';
const ADD_ARTICAL = 'ADD_ARTICAL';

//配置文件
const conf = require('../app.conf.js').repoConf;

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

function updateBlogInfoActionAsync(){
	return (dispatch) => {
		fetch('https://api.github.com/repos/' + conf.userName + '/' + conf.repo + '/issues?filter=created')
			.then(res => res.json())
			.then(data => {
				dispatch(updateBlogInfoAction(data));
				dispatch(getListCatAction(_catSimplifiedResult(data)));
				dispatch(getListAction(_simplifyResult(data)));
			}).catch((err) => {
				throw err;
				alert('网络异常!');
			});		
		}
}

function getSingleArticalActionAsync(id){
	return (dispatch) => {
		fetch('https://api.github.com/repos/' + conf.userName + '/' + conf.repo + '/issues/' + id)
			.then(res => res.json())
			.then(data => {
				dispatch(addArtical(data));
			}).catch((err) => {
				throw err;
				alert('网络异常!');
			});		
		}
}


//为了实现组件异步加载 把解析body放到action中
function addArtical(data){
	return (dispatch) => {
		require.ensure([], () => {
			const marked = require('marked');
			const hljs = require('highlight.js');
			marked.setOptions({
				renderer: new marked.Renderer(),
				gfm: true,
				tables: true,
				breaks: false,
				pedantic: false,
				sanitize: false,
				smartLists: true,
				smartypants: false,
				highlight: code => hljs.highlightAuto(code).value
			});
			data.body = marked(data.body);
			dispatch(_addArtical(data));
		}, 'marked');
	}
}

function _addArtical(result){
	return {
		type: ADD_ARTICAL,
		result : result 
	}
}

module.exports = { 
	UPDATE_LIST, 
	UPDATE_LIST_CAT, 
	ADD_ARTICAL, 
	UPDATE_BLOG_INFO, 
	getListAction, 
	updateBlogInfoActionAsync, 
	addArtical, 
	getSingleArticalActionAsync
};

