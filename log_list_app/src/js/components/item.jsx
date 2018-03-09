import React from 'react';
import Reflux from 'reflux';
import _ from 'underscore';
import ItemDetail from './itemDetail.jsx';
import ItemListActions from '../actions/itemListActions';

var Item = React.createClass({
	createStatuses(){
		let statuses = [];
		_.chain(this.props.data.details)
			.each(detail => {
				if(typeof detail.status === "string"){
					statuses.push(<li><i className={"status-ind "+detail.status.toLowerCase()}/></li>)	
				} else {
					statuses.push(<li><i className="status-ind running" data-perc={detail.status+"%"}><span style={{width: detail.status+"%"}}></span></i></li>)	
				}
			})
		return statuses;	
	},
	createDetails(){
		if(this.props.isExp){
			return <ItemDetail data={this.props.data}/>;
		} else {
			return "NOT EXPENDED";	
		}
	},
	getIcon(){
		if(this.props.data.type=="firewall"){
			return <i className="fa fa-fire"/>
		} else {
			return <i className="fa fa-desktop"/>
		}
	},
	render() {
		return (
			<li className={"item-wrapper "+this.props.data.status.toLowerCase()+" "+this.props.isExp}>
				<ul onClick={ItemListActions.toggleItem.bind(this, this.props.data.id, this.props.isExp)} className="heading clearfix">
					<li className={this.props.data.type}>{this.getIcon()} {this.props.data.name}</li>
					<li>{this.props.data.owner}</li>
					<li>{this.props.data.started}</li>
					<li>{this.props.data.status}</li>
					{this.createStatuses()}
				</ul>
				<div className="details">
					{this.createDetails()}
				</div>
			</li>    	
		);
	}
})

export default Item;
