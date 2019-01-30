import React from 'react';
import Modal from 'react-modal';

class TagIndexItem extends React.Component {
  constructor(props) {
    super(props);
    const prevState = { deletePopup: false, modalIsOpen: false };
    this.state = Object.assign(prevState, this.props);
    this.togglePopup = this.togglePopup.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  openModal() {
    this.togglePopup();
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  togglePopup() {
    // e.stopPropagation();
    this.setState({ deletePopup: !this.state.deletePopup });
  }

  handleDelete(e) {
    e.preventDefault();
    const that = this;
    this.props.deleteTag(this.props.tag.id).then(that.props.history.push('/tags'));
  }

  render(){
    const popup = this.state.deletePopup ? "show" : "hide";
    return (
      <div className="single-tag-row">
        <div className="single-tag">
          <div className="single-tag-contents">
            <div className="tag-name">{this.props.tag.name}</div>
            <div><i className="fa fa-caret-down" onClick={this.togglePopup}></i></div>
          </div>
          <div className={`tag-delete ${popup}`} >
            <div className="tag-delete-row" onClick={this.openModal}>
              <div>Delete tag...</div>
            </div>
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
    )
  }

}

export default TagIndexItem;