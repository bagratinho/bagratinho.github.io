import React from 'react';
import Reflux from 'reflux';
import _ from 'underscore';
import ItemListActions from '../actions/itemListActions';

var FinalOverview = React.createClass({
	buildContent(d){
		let jsx = "";
		if(d.type=="firewall"){
			let button = "";
			switch (d.status){
				case "Accepted":
					button = <button><i className="fa fa-search"/> Merged Build</button>;
					break;
				case "Rejected":
					button = <button><i className="fa fa-search"/> Find Issues</button>;
					break;
			}
			return jsx = <div className="final-overview">
					<label>Result</label>
					<span className={d.status.toLowerCase()}>Change {d.status}</span>
					<p className={d.status.toLowerCase()}>{d.status_txt}</p>
					{button}
				</div>
		} else {
			let button = "";
			switch (d.status){
				case "Complete":
					button = <div><button>Deploy To</button><select><option>Production</option></select></div>;
					break;
				case "Failed":
					button = <button><i className="fa fa-search"/> Find Issues</button>;
					break;
			}
			return jsx = <div className="final-overview">
					<label>Result</label>
					<p className={d.status.toLowerCase()}>{d.status}</p>
					{button}
				</div>			
		} 
	},	
	render() {
		return this.buildContent(this.props.data)
	}
})
export default FinalOverview;			