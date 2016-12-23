import Reflux from 'reflux';
import ItemListActions from '../actions/itemListActions';

var ModalStore = Reflux.createStore({
    listenables: [ItemListActions],
    isOpen: false,
    openModal: function(id) {
        this.isOpen = true;
        this.trigger(this.isOpen)
    },
    closeModal: function(id) {
        this.isOpen = false;
        this.trigger(this.isOpen)
    }
});

module.exports = ModalStore;
