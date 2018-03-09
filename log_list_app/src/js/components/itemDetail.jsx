import React from 'react';
import Reflux from 'reflux';
import _ from 'underscore';
import TestOverview from './testOverview.jsx';
import MetricsOverview from './metricsOverview.jsx';
import BuildOverview from './buildOverview.jsx';
import FinalOverview from './finalOverview.jsx';
import {Chart} from 'react-google-charts';

var ItemDetail = React.createClass({
	buildDetails(){
		let data = this.props.data;
		let details = [];
		_.chain(data.details)
			.each(detail => {
				let jsx;
				switch (detail.label){
					case "Metrics":
						jsx = this.prepareMetricsOverview(detail);
						details.push(jsx);
						break;
					case "Build":
						jsx = this.prepareBuildOverview(detail);
						details.push(jsx);
						break;
					case "Unit Test":
						jsx = this.prepareTestOverview(detail);
						details.push(jsx);
						break;
					case "Functional Test":
						jsx = this.prepareTestOverview(detail);
						details.push(jsx);
						break;
				}
			})
		let finalOverview = this.prepareFinalOverview(data)
		details.push(finalOverview)
		return details;
	},
	prepareFinalOverview(d){
		return <FinalOverview data={d}/>
	},
	prepareMetricsOverview(d){
		return <MetricsOverview data={d}/>
	},
	prepareBuildOverview(d){
		return <BuildOverview data={d}/>
	},
	prepareTestOverview(d){
		return <TestOverview data={d}/>
	},
	render() {
		return (
			<div className="d-row clearfix">
				{this.buildDetails()}
			</div> 	
		);
	}
})

export default ItemDetail;
