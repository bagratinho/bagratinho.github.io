import Reflux from 'reflux';
import ItemListActions from '../actions/itemListActions';
import ItemList from '../data/itemList';

var ItemListStore = Reflux.createStore({
    listenables: [ItemListActions],
    itemList: [],
    getItemList: function() {
    	this.itemList = ItemList;
    	let store = this;
    	window.setTimeout(function(){
    		store.trigger(store.itemList);
    	},2000)
    }
}); 

export default ItemListStore;
