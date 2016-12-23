import React from 'react';
import Reflux from 'reflux';
import _ from 'underscore';
import ItemListActions from '../actions/itemListActions';

var BuildOverview = React.createClass({
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
		let jsx = <div className={"detail-cell "+status.toLowerCase()}>
				<h3>{d.label}</h3>
				<div onClick = {ItemListActions.openModal} className="detail-wrapper">
					<div className="st-btn"><i className="fa fa-bug" />Debug</div>
					<div className="st-btn"><i className="fa fa-desktop" />Release</div>
					<div className="date">{d.date}</div>
				</div>
			</div>	
		return jsx
	},	
	render() {
		return this.buildContent(this.props.data)
	}
})
export default BuildOverview;	