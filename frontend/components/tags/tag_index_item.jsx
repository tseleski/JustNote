import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

class TagIndexItem extends React.Component {
  constructor(props) {
    super(props);
    const prevState = { deletePopup: false, modalIsOpen: false };
    this.state = Object.assign(prevState, this.props);
    this.togglePopup = this.togglePopup.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  openModal() {
    this.setState({ deletePopup: false });
    this.setState({ modalIsOpen: true });
  }

  closeModal(e) {
    this.setState({ modalIsOpen: false });
  }

  togglePopup() {
    this.setState({ deletePopup: !this.state.deletePopup });
  }

  closePopup() {
    this.setState({ deletePopup: false });
  }

  handleDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.deleteTag(this.props.tag.id);
  }

  render(){
    const popup = this.state.deletePopup ? "show" : "hide";
    return (
      <div className="single-tag-row">
        <div className="single-tag">
          <div className="single-tag-contents">
            <Link to={`/tags/${this.props.tag.id}`}><div className="tag-name">{this.props.tag.name}</div></Link>
            <div>
              <i className="fa fa-caret-down" onClick={this.togglePopup} onBlur={this.closePopup} tabIndex="0">
                <div className={`tag-delete ${popup}`} >
                  <div className="tag-delete-row" onClick={this.openModal}>
                    <div>Delete tag...</div>
                  </div>  
                </div>
              </i>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel="Modal"
                className="delete-modal"
                overlayClassName="modal-overlay"
                ariaHideApp={false}
              >
                <div className="top-row">
                  <button onClick={this.closeModal} className="x-btn">&times;</button>
                  <h2>Delete tag</h2>
                </div>
                <div className="modal-text">
                  <div className="modal-text-delete-tag">{this.props.tag.name} tag will be deleted and removed from all notes.</div>
                  <div className="modal-text-delete-tag">This action cannot be undone.</div>
                </div>
                <div className="modal-btns">
                  <button onClick={this.closeModal} className="cancel-btn">Cancel</button>
                  <button onClick={this.handleDelete} className="continue-btn">Delete</button>
                </div>
              </Modal>
            </div>
            
          </div>
        </div>
      </div>
    )
  }

}

export default TagIndexItem;