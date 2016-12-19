const React = require('react');
const { Link } = require('react-router');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');


class List extends React.Component {
	render() {
		let data = this.props.list;
		let dataCat = this.props.listCat;
		let tmpl = '';

		if(this.props.listType == "all" && data.length > 0){
			tmpl = (
					<div className="article_list_wrap">
						<p className="title">全部</p>
						{ data.map((item, i) => <p key={i}><Link to={`/page/${item.id}`}>{item.title}</Link><span>{item.date}</span></p>) }
					</div>
				);
		}else if(this.props.listType == "cat" && Object.keys(dataCat).length > 0){
			let cats = Object.keys(dataCat);
			tmpl = (
					<div className="article_list_wrap">
						{
							cats.map((cat, i) => {
								return (
									<div key={i}>
										<p className="title">{cat}</p>
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
		return (
			<ReactCSSTransitionGroup
				transitionName="page"
				transitionAppearTimeout={500}
				transitionEnterTimeout={500}
				transitionAppear={true}
  				transitionEnter={true}
				transitionLeave={false}>
				{tmpl}
			</ReactCSSTransitionGroup>
			);
	}
}

module.exports = List;



