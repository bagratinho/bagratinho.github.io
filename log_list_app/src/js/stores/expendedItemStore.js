import Reflux from 'reflux';
import ItemListActions from '../actions/itemListActions';

var ExpendedItemStore = Reflux.createStore({
    listenables: [ItemListActions],
    itemID: 0,
    toggleItem: function(id, isOpened) {
    	if(!isOpened){
    		this.itemID = id;
    	} else {
    		this.itemID = 0;
    	}	
    	this.trigger(this.itemID);
    }
}); 

export default ExpendedItemStore;
