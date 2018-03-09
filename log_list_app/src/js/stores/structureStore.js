import Reflux from 'reflux';
import ItemListActions from '../actions/itemListActions';
import Structure from '../data/structure';

var StructureStore = Reflux.createStore({
    listenables: [ItemListActions],
    structure: [],    
    getTableStructure: function() {
    	this.structure = Structure;
    	this.trigger(this.structure);
    }
}); 

export default StructureStore;
//module.exports = StructureStore;
