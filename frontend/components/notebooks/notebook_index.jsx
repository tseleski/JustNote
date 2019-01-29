import React from 'react';
import { Link } from 'react-router-dom';
import NotebookIndexItem from './notebook_index_item';
import Modal from 'react-modal';

class NotebookIndex extends React.Component {
  constructor(props){
    super(props);
    const prevState = { modalIsOpen: false };
    this.state = Object.assign(prevState, this.props, {title: ""});

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchNotebooks();
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal(e) {
    // e.stopPropagation();
    this.setState({ modalIsOpen: false });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(){
    this.props.createNotebook({ title: this.state.title }).then(() => this.setState({ title: '' })).then(this.closeModal);
  }

  renderErrors() {
    return (
      <ul className="errors">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { notebooks } = this.props;
    const notebookList = notebooks.map(notebook => {
      return <NotebookIndexItem key={notebook.id} notebook={notebook} 
      deleteNotebook={this.props.deleteNotebook} currentUser={this.props.currentUser}
      openModal={this.props.openModal} closeModal={this.props.closeModal} 
      errors={this.props.errors} updateNotebook={this.props.updateNotebook}
      fetchNotebook={this.props.fetchNotebook} />
    });
    return (
      <div className="notebook-panel">
        <div className="column-header">
          Notebooks
        </div>
        <div className="table-header">
          <span className="header-title">My notebook list</span>
          <div className="new-notebook" onClick={this.openModal}>
            {/* <svg xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24">
              <defs>
                <path id="113a" d="M19 17v-2h2v2h2v2h-2v2h-2v-2h-2v-2h2zm-1-2.874a4.002 4.002 0 0 0-2.952 4.497H9V4h7c1.105 0 2 .873 2 1.95v8.176zM6 4h2v14.623H6V4zm9.5 4h-4c-.276 0-.5.15-.5.333v1.334c0 .184.224.333.5.333h4c.276 0 .5-.15.5-.333V8.333C16 8.15 15.776 8 15.5 8z" ></path>
              </defs>
              <use fill="#fff" fill-rule="nonzero">
                <path id="113a" d="M19 17v-2h2v2h2v2h-2v2h-2v-2h-2v-2h2zm-1-2.874a4.002 4.002 0 0 0-2.952 4.497H9V4h7c1.105 0 2 .873 2 1.95v8.176zM6 4h2v14.623H6V4zm9.5 4h-4c-.276 0-.5.15-.5.333v1.334c0 .184.224.333.5.333h4c.276 0 .5-.15.5-.333V8.333C16 8.15 15.776 8 15.5 8z"></path>
              </use>
            </svg> */}
            <i className="fa fa-book"></i>
            New Notebook </div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              contentLabel="Modal"
              className="create-modal"
              overlayClassName="create-modal-overlay"
              ariaHideApp={false}
            >
              <div className="top-half">
                <div className="top-half-padded">
                  <div className="top-row">
                    <button onClick={this.closeModal} className="x-btn">&times;</button>
                    <h2>Create new notebook</h2>
                  </div>
                  <div className="create-modal-text">Notebooks are useful for grouping notes around a common topic.</div>
                  {this.renderErrors()}
                  <div className="notebook-input">
                    <label> Name </label>
                    <input type="text" placeholder="Notebook name" value={this.state.title} onChange={this.update('title')} />
                  </div>
                </div>
              </div>
              <div className="modal-btns">
                <button onClick={this.closeModal} className="cancel-btn">Cancel</button>
                <button className="continue-btn" onClick={this.handleSubmit}>Continue</button>
              </div>
            </Modal>
          
        </div>
        <div className="notebook-table">
          <div className="column-headers">
            <div className="title-col">TITLE</div>
            {/* <div className="created-col">CREATED BY</div> */}
            <div className="updated-col">UPDATED</div>
            <div className="actions-col">ACTIONS</div>
          </div>
          <ul className="notebook-list">{notebookList}</ul>
        </div>
      </div>
    )
  }
}

export default NotebookIndex;