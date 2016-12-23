import React from 'react';
import ItemList from './itemlist.jsx';
import Modal from './modal.jsx';

var Main = React.createClass({
	render() {
		return (
		  <div> 
		  	<ItemList/>
		  	<Modal/>
		  </div>
		); 
	} 
})

export default Main;
