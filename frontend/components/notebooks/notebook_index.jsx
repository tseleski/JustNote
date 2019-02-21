import React from 'react';
import { Link } from 'react-router-dom';
import NotebookIndexItem from './notebook_index_item';
import Modal from 'react-modal';
import Loading from '../loader';

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
    this.props.clearNotebookErrors();
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
    this.props.clearNotebookErrors();
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

  renderIndexErrors(){
    if (this.props.errors[0] === 'You must have at least one notebook'){
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
  }

  render() {
    const { notebooks } = this.props;
    if (notebooks.length === 0) {
      return <Loading page={"notebooks"} />
    } else {
      const notebookList = notebooks.map(notebook => {
        return <NotebookIndexItem key={notebook.id} notebook={notebook} 
        deleteNotebook={this.props.deleteNotebook} currentUser={this.props.currentUser}
        openModal={this.props.openModal} closeModal={this.props.closeModal} 
        errors={this.props.errors} updateNotebook={this.props.updateNotebook}
        fetchNotebook={this.props.fetchNotebook} notes={this.props.notes}
        clearNotebookErrors={this.props.clearNotebookErrors} />
      });
      return (
        <div className="notebook-panel">
          <div className="column-header">
            Notebooks
          </div>
          <div className="table-header">
            <span className="header-title">My notebook list</span>
            <div className="new-notebook" onClick={this.openModal}>
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
              <div className="updated-col">UPDATED</div>
              <div className="actions-col">ACTIONS</div>
            </div>
            <ul className="notebook-list">{notebookList}</ul>
          </div>
          {this.renderIndexErrors()}
        </div>
      )
    }
  }
}

export default NotebookIndex;