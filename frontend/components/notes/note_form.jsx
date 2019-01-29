import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';


class NoteForm extends React.Component{
  constructor(props){
    super(props);
    const prevState = { deleteModal: false, modalIsOpen: false };
    this.state = Object.assign(prevState, this.props.note, this.props.notebookId);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  componentDidMount() {
    if(this.props.formType === 'Edit'){
      this.props.fetchNote(this.props.id).then(({ note, notebook }) => {
        this.setState({ id: note.id, title: note.title, content: note.content});
        this.setState({ notebook: notebook });
      });
    }
    this.props.fetchNotebooks().then( ({ notebooks }) => {
      this.setState({ notebooks: notebooks });
    });
  }

  componentDidUpdate(prevProps){
    if(prevProps.note.id != this.props.id) {
      this.props.fetchNote(this.props.id).then(({ note }) => {
        this.setState({ id: note.id, title: note.title, content: note.content, plain_text: note.plain_text });
      });
    }
  }

  handleSubmit(e){
    e.preventDefault();
    if (this.props.formType === 'Create'){
      const note = Object.assign(this.state, { notebook_id: this.props.notebookId});
      if( this.props.notebookId ){
        this.props.action(note).then(this.props.history.push(`/notebooks/${this.props.notebookId}`));
      } else {
        this.props.action(note).then(this.props.history.push(`/notes`));
      }
    } else {
      this.props.action(this.state);
    }
  }

  handleEditorChange(content, delta, source, editor) {
    this.setState({
      content: content,
      plain_text: editor.getText().trim()
    });
  }

  update(field){
    return e => this.setState({[field]: e.target.value});
  }

  openModal() {
    this.toggleDelete();
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleDelete(e){
    e.preventDefault();
    const that = this;
    this.props.deleteNote(this.props.id).then(() => {
      let newPath = that.props.history.location.pathname.match(/\/notebooks\/[0-9]*/) || "/notes";
      if (newPath !== "/notes"){
        newPath = newPath[0];
      }
      that.props.history.push(newPath)
    }).then(that.closeModal);
      // that.props.history.push(that.props.history.location.pathname.match(/\/notebooks\/[0-9]*/)[0])).then(that.closeModal);
  }

  toggleDelete(){
    this.setState({ deleteModal: !this.state.deleteModal });
  }

  renderDelete(){
    const deleteModal = this.state.deleteModal ? "show" : "hide";
    if(this.state.notebooks){
      const notebooks = Object.values(this.state.notebooks);
    }
    // const notebookList = notebooks.map( notebook => {
    //   return 
    // })
    if (this.props.formType === 'Edit'){
      return (
        <div className="above-form">
          <div className="notebook-name">
            <i className="fa fa-book"></i>
            {this.props.notebook}
          </div>
          <div className="three-dots">
            <p onClick={this.toggleDelete} className="dots">...</p>
            <p onClick={this.openModal} className={`delete-note ${deleteModal}`}>Delete note</p>
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
                <h2>Delete Note</h2>
              </div>
              <div className="modal-text">{this.state.title} will be deleted.</div>
              <div className="modal-btns">
                <button onClick={this.closeModal} className="cancel-btn">Cancel</button>
                <button onClick={this.handleDelete} className="continue-btn">Continue</button>
              </div>
            </Modal>

          </div> 
        </div>
      )
    }
  }

  render(){
    const toolbar = [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      ['italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],

      [{ 'size': ['small', false, 'large', 'huge'] }],

      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],

    ];
    return (
      <div className="note-panel">
        {this.renderDelete()}
        <div className="note-form">
          <form onSubmit={this.handleSubmit}>
            <div className="input-fields">
              <input className="title-input" type="title" value={this.state.title} onChange={this.update('title')} placeholder="Title"/>
              <ReactQuill
                theme="snow"
                modules={{ toolbar }}
                value={this.state.content}
                ref={editor => { this.editor = editor; }}
                placeholder={"Start writing here..."}
                onChange={this.handleEditorChange}
              >
              </ReactQuill>
            </div>
            <input type="submit" value="Save"/>
          </form>
        </div>
      </div>
    )
  }

}

export default withRouter(NoteForm);