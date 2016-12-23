import React from 'react';
import Reflux from 'reflux';
import _ from 'underscore';
import ItemListActions from '../actions/itemListActions';

var MetricsOverview = React.createClass({
	buildContent(d){
		if(d.status=="Pending"){
			return <div className={"detail-cell "+d.status.toLowerCase()}>
				<h3>{d.label}</h3>
				<div className="detail-wrapper">
					<div className="n-a">Pending</div>
				</div>
			</div>	
		}
		if(typeof d.status!=="string"){
			return <div className={"detail-cell running"}>
				<h3>{d.label}</h3>
				<div className="detail-wrapper">
					<div className="n-a">Running...</div>
				</div>
			</div>	
		}
		let status = typeof d.status == "string" ? d.status : "running";
		let list = [];
		_.chain(d.items)
			.each(i => {
				let tr = "";
				if(i.trend > 0){
					tr =  "up";
				} else {
					tr = i.trend == 0 ? "level" : "down";
				}
				let jsx = <div className={"arrow-box " + tr}>
							<div><span>{i.value}</span></div>
							<div>{i.label}</div>
						</div>;
				list.push(jsx);		
			})
		let jsx = <div className={"detail-cell "+status.toLowerCase()}>
				<h3>{d.label}</h3>
				<div onClick = {ItemListActions.openModal} className="detail-wrapper clearfix">{list}</div>
			</div>	
		return jsx;	
	},	
	render() {
		return this.buildContent(this.props.data)
	}
})
export default MetricsOverview;			