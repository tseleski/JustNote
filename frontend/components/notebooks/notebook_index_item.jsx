import React from 'react';
import { format } from 'timeago.js';
import Modal from 'react-modal';
// import { openModal } from '../../actions/modal_actions';
// import Modal from '../modal/modal';
// import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import NotebookIndexNoteItem from './notebook_index_note_item';

class NotebookIndexItem extends React.Component {
  constructor(props){
    super(props);
    const prevState = { modalIsOpen: false, actions_popup: false, notesShow: false };
    this.state = Object.assign(prevState, this.props.notebook, this.props.errors);
    this.handleDotsClick = this.handleDotsClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount(){
    this.props.fetchNotebook(this.props.notebook.id).then(() => {
      this.setState({ notes: this.props.notes });
    });
  }

  openModal() {
    this.props.clearNotebookErrors();
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  closePopup() {
    this.setState({ popup: false });
  }

  handleDotsClick(e){
    e.preventDefault();
  }

  toggleShow(){
    this.setState({ notesShow: !this.state.notesShow });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit() {
    this.props.updateNotebook({ title: this.state.title, id: this.state.id }).then(this.closeModal);
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

  togglePopup() {
    this.setState({ popup: !this.state.popup });
  }

  renderDots(){
    const popup = this.state.popup ? "show" : "hide";
    return (
      <>
        <div onClick={this.togglePopup} onBlur={this.closePopup} tabIndex="0">
          <div className="three-dots">...</div>
          <div className={`actions-list ${popup}`}>
            <li onClick={this.openModal}>Rename Notebook</li>
            <li onClick={() => this.props.deleteNotebook(this.state.id)}>Delete Notebook</li>
          </div>
        </div>
      </>
    )
  }

  renderNotes(){
    const notesShow = this.state.notesShow ? "show" : "hide";
    const notes = this.state.notes || [];
    const notesList = notes.map(note => {
      return (
        <NotebookIndexNoteItem key={note.id} note={note} notebookId={this.props.notebook.id}/>
      )
    })
      // <ul className={`notebook-notes ${notesShow}`}>{notesList}</ul>
    if(notesShow === "show"){
      return (
        <>
          {notesList}
        </>
      )
    }  
  }

  renderCaret() {
    const notesShow = this.state.notesShow ? "down" : "right";
    return (
      <i onClick={this.toggleShow} className={`fa fa-caret-right ${notesShow}`}></i>
    )
  }

  render(){
    return (
      <>
        <div className="notebook-index-item">
          <div className="single-notebook" onClick={() => {
            if (this.state.popup){
              this.setState({ popup: false })
              }
            }}>
            <div className="title-area">
              {this.renderCaret()}
              <Link to={`/notebooks/${this.state.id}`}><div className="title">
                <i className="fa fa-book"></i>
                {this.state.title}
              </div></Link>
            </div>
            <div className="updated">
              <p>{format(this.state.updated_at)}</p>
            </div>
            <div className="actions-panel">
              {this.renderDots()}
            </div>

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
                    <h2>Rename notebook</h2>
                  </div>
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

            {/* <button onClick={() => props.deleteNotebook(props.notebook.id)}>Delete Notebook</button> */}
          </div>
        </div>
        {this.renderNotes()}
      </>
    )
  }
  
}

export default NotebookIndexItem;