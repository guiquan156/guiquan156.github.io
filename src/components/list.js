const React = require('react');
const { Link } = require('react-router');

class List extends React.Component {
	render() {
		//todo 改成读数据操作
		let data = this.props.list;
		let dataCat = this.props.listCat;
		let tmpl = '';

		if(this.props.listType == "all"){
			tmpl = (
					<div className="article_list_wrap">
						<p className="title">全部</p>
						{ data.map((item, i) => <p key={i}><Link to={`/page/${item.id}`}>{item.title}</Link><span>{item.date}</span></p>) }
					</div>
				);
		}else if(this.props.listType == "cat"){
			if(Object.keys(dataCat).length == 0)
				tmpl = <div className="article_list_wrap"></div>;
			else{
				let cats = Object.keys(dataCat);
				tmpl = (
						<div className="article_list_wrap">
							{
								cats.map((cat, i) => {
									return (
										<div>
											<p className="title" key={i}>{cat}</p>
											<div>
												{ dataCat[cat].map((item, k) => <p key={k}><Link to={`/page/${item.id}`}>{item.title}</Link><span>{item.date}</span></p>) }
											</div>
										</div>
										)
								})
							}
						</div>
					);
			}
		}
		return tmpl;
	}
}

module.exports = List;



