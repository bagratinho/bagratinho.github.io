import React from 'react';
import Reflux from 'reflux';
import _ from 'underscore';
import Item from './item.jsx';
import ItemListStore from '../stores/itemListStore';
import StructureStore from '../stores/structureStore';
import ExpendedItemStore from '../stores/expendedItemStore';
import ItemListActions from '../actions/itemListActions';

var ItemList = React.createClass({

	mixins: [Reflux.ListenerMixin],
	getInitialState(){
		return {
			tableStructure: [],
			itemList: [],
			loading: 1,
			expID: 0
		}
	},
	onData(data) {
		this.setState({
			loading: 0,
		    itemList: data
		});
	},
	onExpend(id) {
		this.setState({
			expID: id
		});
	},
	onStructure(data) {
		this.setState({
		    tableStructure: data
		});
	},
	componentDidMount(){
		ItemListActions.getTableStructure();
		ItemListActions.getItemList();
		this.listenTo(StructureStore, this.onStructure);
		this.listenTo(ItemListStore, this.onData);
		this.listenTo(ExpendedItemStore, this.onExpend);
	},
	createStructureJSX(){
		let data = this.state.tableStructure;
		let items = [];
		if(data.length == 0 || typeof data === "undefined"){
			return <div className="title-loader"></div>
		} else {
			_.chain(data)
				.each(item => {
					items.push(<li>{item}</li>)
				})
			return items;	
		}
	},
	createListJSX(){
		let data = this.state.itemList;
		let items = [];
		if((data.length == 0 || typeof data === "undefined") && this.state.loading == 0){
			return <li className="no-items">BUMMER! NO DATA TO DISPLAY</li>
		} else if (this.state.loading == 1) {
			return <li className="loading">
				<div className="spinner">
				  <div className="bounce1"></div>
				  <div className="bounce2"></div>
				  <div className="bounce3"></div>
				</div>
			</li>
		} else {
			_.chain(data)
				.each(item => {
					let isExp = (item.id == this.state.expID) ? true : false;
					items.push(<Item isExp={isExp} data={item}/>)
				})
			return items;	
		}
	},
	render() {
		return (
		  <div className="list-wrapper">
		  	<ul className="heading clearfix">{this.createStructureJSX()}</ul>
		  	<ul className="item-list clearfix">{this.createListJSX()}</ul>
		  </div>
		);
	}
})

export default ItemList;
