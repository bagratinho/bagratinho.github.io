import React from 'react';
import Reflux from 'reflux';
import _ from 'underscore';
import ModalStore from '../stores/modalStore';
import ItemDeepDetails from './itemDeepDetails.jsx';
import ItemListActions from '../actions/itemListActions';

var Modal = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState(){
    return {
      modalClass: "close"
    }
  },
  onData(bool) {
    if(bool){
      this.setState({
          modalClass: "open"
      });   
    } else {
      this.setState({
          modalClass: "close"
      });        
    }
  },

  componentDidMount(){
    this.listenTo(ModalStore, this.onData);
  },
  closeModal(){
    ItemListActions.closeModal();
  },
  render() {
    return (
      <div className={"modal-wrapper " + this.state.modalClass}>
        <div className="overlay"></div>
        <div className="modal">
          <div className="modal-inner">
            <ItemDeepDetails/>
            <button onClick={this.closeModal}><i className="fa fa-close"/></button> 
          </div>
        </div>
      </div>
    );
  }
})

export default Modal;
