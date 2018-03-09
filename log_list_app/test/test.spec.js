import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import _ from 'underscore';

import Main from '../src/js/components/main';
import ItemList from '../src/js/components/itemList';
import Item from '../src/js/components/item';
import ItemListData from '../src/js/data/itemList';
import StructureData from '../src/js/data/structure';

import Modal from '../src/js/components/modal';

describe('<Main/>', function () {
  it('loads main component correctly', function () {
    const wrapper = shallow(<Main/>);
    expect(wrapper.find('ItemList')).to.have.length(1);
    expect(wrapper.find('Modal')).to.have.length(1);
  });
});

describe('<ItemList/>', function () {
  it('loads ItemList component correctly', function () {
    const wrapper = shallow(<ItemList/>);
    expect(wrapper.find('div.list-wrapper')).to.have.length(1);
    expect(wrapper.find('ul.heading')).to.have.length(1);
    expect(wrapper.find('ul.item-list')).to.have.length(1);
    expect(wrapper.find('li.loading')).to.have.length(1);
  });
  it('gets correct begining state', function () {
    const wrapper = shallow(<ItemList/>);
    let state = { tableStructure: [], itemList: [], loading: 1, expID: 0,  }
    expect(wrapper.state()).to.deep.equal(state);
  });
  it('displays correctly if no data to display', function () {
    const wrapper = shallow(<ItemList/>);
    wrapper.setState({loading: 0, expID: 0});
    expect(wrapper.find('li.no-items')).to.have.length(1);  
  });
  it('displays table titles on structure data', function () {
    const wrapper = shallow(<ItemList/>);
    const data = StructureData;
    wrapper.setState({tableStructure: data});
    expect(wrapper.find('ul.heading li')).to.have.length(8);  
  });
  it('displays items list on data', function () {
    const wrapper = shallow(<ItemList/>);
    const data = ItemListData;
    wrapper.setState({itemList: data, loading: 0});
    expect(wrapper.find('Item')).to.have.length(10);  
  });
  it('opens single item when gets new expended ID', function () {
    const wrapper = mount(<ItemList/>);
    const data = ItemListData;
    const expID = Math.ceil(Math.random()*data.length);
    wrapper.setState({itemList: data, expID: expID, loading: 0});
    _.chain(data)
    	.each((item,index) => {
    		if(item.id == wrapper.state().expID){
    			expect(wrapper.find('ul.item-list').childAt(index).find('ItemDetail')).to.have.length(1)
    		}
    		else{
    			expect(wrapper.find('ul.item-list').childAt(index).find('ItemDetail')).to.have.length(0)
    		}
    	})
  });
  it('closes opened item when expected ID is 0', function () {
    const wrapper = mount(<ItemList/>);
    const data = ItemListData;
    let expID = Math.ceil(Math.random()*data.length);
    wrapper.setState({itemList: data, expID: expID, loading: 0});
    _.chain(data)
    	.each((item,index) => {
    		if(item.id == wrapper.state().expID){
    			expect(wrapper.find('ul.item-list').childAt(index).find('ItemDetail')).to.have.length(1)
    		}
    		else{
    			expect(wrapper.find('ul.item-list').childAt(index).find('ItemDetail')).to.have.length(0)
    		}
    	})
    expID = 0;	
    wrapper.setState({expID: expID});
    _.chain(data)
	.each((item,index) => {
    	expect(wrapper.find('ul.item-list').childAt(index).find('ItemDetail')).to.have.length(0)
	})
  });
  it('closes opened item when expected ID has changed and opens new one', function () {
    const wrapper = mount(<ItemList/>);
    const data = ItemListData;
    let expID = Math.ceil(Math.random()*data.length);
    wrapper.setState({itemList: data, expID: expID, loading: 0});
    _.chain(data)
    	.each((item,index) => {
    		if(item.id == wrapper.state().expID){
    			expect(wrapper.find('ul.item-list').childAt(index).find('ItemDetail')).to.have.length(1)
    		}
    		else{
    			expect(wrapper.find('ul.item-list').childAt(index).find('ItemDetail')).to.have.length(0)
    		}
    	})
    while(true){
    	let newID = Math.ceil(Math.random()*data.length);
    	if(newID != expID){
    		expID = newID;
    		break
    	}
    }	
    wrapper.setState({expID: expID});
    _.chain(data)
    	.each((item,index) => {
    		if(item.id == wrapper.state().expID){
    			expect(wrapper.find('ul.item-list').childAt(index).find('ItemDetail')).to.have.length(1)
    		}
    		else{
    			expect(wrapper.find('ul.item-list').childAt(index).find('ItemDetail')).to.have.length(0)
    		}
    	})
  });

});
