import React from 'react';
import Reflux from 'reflux';
import _ from 'underscore';
import {Chart} from 'react-google-charts';
import ItemListActions from '../actions/itemListActions';

var TestOverview = React.createClass({
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
		let data = [];
		let pos = 0;
		let neg = 0;
		let per = "N/A";
		let label = "";
		_.chain(d.chartData)
			.each(obj => {
				let row = [];
				pos = obj.label == "passed" ? obj.value : pos;
				neg = obj.label == "failed" ? obj.value : pos;
				row.push(obj.label);
				row.push(obj.value);
				data.push(row)
			})
		data.unshift(["Prop","Count"]);
		if(pos || neg){
			per = Math.round(pos*100/(pos+neg))+"%";
			label = <label>{per}<span>Tests<br/>passed</span></label> 
		}
		let jsx = <div className={"detail-cell "+status.toLowerCase()}>
				<h3>{d.label}</h3>
				<div onClick = {ItemListActions.openModal} className="detail-wrapper">
					<div className="chart">
				      <Chart
				        chartType="PieChart" 
				        data={data}
				        options={{
			        	chartArea:{
				        	left:0,
				        	top:15,
				        	bottom: 15,
				        	width:'100%',
				        	height:'100%'				        	
				        }, 				        
						slices: { 
							0: { color: '#8db580' },
							1: { color: '#f9564f' }
						},
				        pieHole: "0.45",
				        "is3D":false,
				        legend:{position:"none"},
				        pieSliceText:'value'}}
				        width="100%"
				        height="160px"
				        legend_toggle
				       />
				       {label}				       
				    </div>  
				    <div className="bar-chart" data-perc={d.code_covered_prc+"%"} data-label="code covered"><span style={{width: d.code_covered_prc+"%"}}></span></div> 
				</div>
			</div>	
		return jsx;
	},	
	render() {
		return this.buildContent(this.props.data)
	}
})
export default TestOverview;		