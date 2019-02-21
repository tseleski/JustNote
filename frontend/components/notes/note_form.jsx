import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import TagForm from '../tags/tag_form';
import { Link } from 'react-router-dom';

class NoteForm extends React.Component{
  constructor(props){
    super(props);
    const prevState = { deleteModal: false, modalIsOpen: false, moveModalIsOpen: false, 
      notebooks: [], expanded: false, focus: false };
    this.state = Object.assign(prevState, this.props.note, this.props.notebookId);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openMoveModal = this.openMoveModal.bind(this);
    this.closeMoveModal = this.closeMoveModal.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleNotebookChange = this.handleNotebookChange.bind(this);
    this.autoSave = this.autoSave.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.expandNote = this.expandNote.bind(this);
    this.revealToolbar = this.revealToolbar.bind(this);
  }

  componentDidMount() {
    this.setState({ focus: false });
    this.props.clearNoteErrors();
    if(this.props.formType === 'Edit'){
      this.props.fetchNote(this.props.id).then(({ note, notebook }) => {
        this.setState({ id: note.id, title: note.title, content: note.content, notebook_id: note.notebook_id});
        this.setState({ notebook: notebook });
      });
    }
    this.props.fetchNotebooks().then( ({ notebooks }) => {
      this.setState({ notebooks: Object.values(notebooks) });
    });
  }

  componentDidUpdate(prevProps){
    if (Boolean(prevProps.note.id) && (prevProps.note.id != this.props.id)) {
      this.props.clearNoteErrors();
      this.props.fetchNote(this.props.id).then(({ note }) => {
        this.setState({ id: note.id, title: note.title, content: note.content, plain_text: note.plain_text, notebook_id: note.notebook_id });
      });
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.action(this.state).then(this.props.clearNoteErrors());
  }

  autoSave(){
    this.props.action(this.state);
  }

  handleTitleChange(e){
    this.setState({ title: e.currentTarget.value });
    setTimeout(() => this.autoSave(), 1000);
  }

  handleEditorChange(content, delta, source, editor) {
    if(this.state.content !== content){
      this.setState({
        content: content,
        plain_text: editor.getText().trim()
      });
      setTimeout(() => this.autoSave(), 1000);
    }
  }

  update(field){
    return e => this.setState({[field]: e.target.value});
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  openMoveModal() {
    this.setState({ moveModalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  closeMoveModal() {
    this.setState({ notebook_id: this.props.note.notebook_id });
    this.setState({ moveModalIsOpen: false });
  }

  closePopup() {
    this.setState({ deleteModal: false });
  }

  expandNote(){
    this.setState({ expanded: !this.state.expanded });
  }

  revealToolbar(){
    this.setState({ focus: true });
  }

  renderNotebooks(){
    const notebookList = this.state.notebooks.map(notebook => {
      return(
        <option className="notebook-dropdown-item" key={notebook.id} value={notebook.id}>{notebook.title}</option>
      )
    })
    return (
      <select className="notebook-dropdown" onChange={this.update('notebook_id')} value={this.state.notebook_id}>
        {notebookList}
      </select>
    )
  }

  handleNotebookChange(){
    if(this.props.note.notebook_id != this.state.notebook_id){
      this.autoSave();
    }
    this.closeMoveModal();
    if(this.props.history.location.pathname.match(/\/notebooks\/[0-9]*/)){
      if (this.state.notebook_id != this.props.history.location.pathname.match(/\/notebooks\/([0-9]*)/)[1]){
        this.props.history.push(this.props.history.location.pathname.match(/\/notebooks\/[0-9]*/)[0])
      }
    }
  }

  handleDelete(e){
    e.preventDefault();
    const that = this;
    this.props.deleteNote(this.props.id).then(() => {
      let newPath = that.props.history.location.pathname.match(/\/notebooks\/[0-9]*/) || 
        that.props.history.location.pathname.match(/\/tags\/[0-9]*/) ||
        that.props.history.location.pathname.match(/\/search\//) ||
        "/notes";
      if (newPath !== "/notes"){
        newPath = newPath[0];
      }
      that.props.history.push(newPath);
    }).then(that.closeModal);
  }

  toggleDelete(){
    this.setState({ deleteModal: !this.state.deleteModal });
  }

  renderExpand(){
    if(this.state.expanded){
      return <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="_1XQCwpJQ0CorthWG09dmAH"><g fill="none" fill-rule="evenodd"><path d="M0 0h20v20H0z"></path><path 
        d="M7.408 6.411V4.415a.7.7 0 0 1 1.4 0v3.623a.69.69 0 0 1-.19.572.694.694 0 0 1-.517.201H4.408a.7.7 0 1 1 0-1.398h2.02L2.205 3.196a.7.7 0 1 1 .991-.99L7.408 6.41zm7.162 3.756a.7.7 0 1 1 0 1.398h-2.019l4.243 4.239a.7.7 0 1 1-.991.99l-4.233-4.227v1.996a.7.7 0 0 1-1.4 0v-3.697a.7.7 0 0 1 .7-.699h3.7z" fill="#20C05C"></path></g></svg>
    } else {
      return(
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M0 0h20v20H0z"></path><path d="M3.405 4.4v1.997a.7.7 0 0 1-1.4 0V2.774a.69.69 0 0 1 .19-.572A.694.694 0 0 1 2.713 2h3.693a.7.7 0 1 1 0 1.399h-2.02l4.222 4.216a.7.7 0 1 1-.991.991L3.405 4.4zM12.6 17a.7.7 0 1 1 0-1.398h2.019l-4.243-4.239a.7.7 0 1 1 .991-.99L15.6 14.6v-1.996a.7.7 0 0 1 1.4 0V16.3a.7.7 0 0 1-.7.699h-3.7z" fill="#000" opacity=".34"></path></g></svg>
      )
    }
  }

  render(){

  }

  renderThreeDots(){
    let noteTitle;
    if (this.state.title === '') {
      noteTitle = 'Untitled';
    } else {
      noteTitle = this.state.title;
    }
    const limitedContent = (content) => {
      if (content.split('').length < 20) {
        return content;
      }
      return content.substring(0, 20) + "...";
    };

    const deleteModal = this.state.deleteModal ? "show" : "hide";
    if (this.props.formType === 'Edit'){
      return (
        <div className="above-form">
          <div className="above-form-left">
              <div onClick={this.expandNote} className="expand-note">
                {this.renderExpand()}
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M0 0h20v20H0z"></path><path fill="#CCC" d="M10 18h1V2h-1z"></path></g></svg>
              <Link to={`/notebooks/${this.props.notebook.id}`}><div className="notebook-name">
                <i className="fa fa-book"></i>
                <div className="notebook-title">{this.props.notebook.title}</div>
              </div></Link>
          </div>
          <div className="three-dots" >
            <div onClick={this.toggleDelete} onBlur={this.closePopup} tabIndex="0">
              <div className="dots" >...</div>
              <div className={`delete-note ${deleteModal}`}>
                <div onClick={this.openMoveModal} className="delete-note-item">Move to...</div>
                <div onClick={() => this.props.createNote(this.state)} className="delete-note-item">Duplicate note</div>
                <div onClick={this.openModal} className="delete-note-item">Delete note</div>
              </div>
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
                <h2>Delete Note</h2>
              </div>
              <div className="modal-text">{limitedContent(noteTitle)} will be deleted.</div>
              <div className="modal-btns">
                <button onClick={this.closeModal} className="cancel-btn">Cancel</button>
                <button onClick={this.handleDelete} className="continue-btn">Continue</button>
              </div>
            </Modal>
            <Modal
              isOpen={this.state.moveModalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeMoveModal}
              contentLabel="Modal"
              className="delete-modal"
              overlayClassName="modal-overlay"
              ariaHideApp={false}
            >
              <div className="top-row">
                <button onClick={this.closeMoveModal} className="x-btn">&times;</button>
                <h2>Move note to...</h2>
              </div>
              {this.renderNotebooks()}
              <div className="modal-text change-notebook">  </div>
              <div className="modal-btns">
                <button onClick={this.closeMoveModal} className="cancel-btn">Cancel</button>
                <button onClick={this.handleNotebookChange} className="continue-btn change-notebook">Move</button>
              </div>
            </Modal>

          </div> 
        </div>
      )
    } else {
      return (
        <div className="above-form">
          <div className="notebook-name">
          </div>
          <div className="three-dots" >
          </div>
        </div>
      )
    }
  }

  renderErrors() {
    return (
      <ul className="note-form-errors errors">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }


  renderTagForm(){
    if (this.props.formType === 'Edit') {
      return(
        <TagForm createTag={this.props.createTag} errors={this.props.tagErrors} 
        clearTagErrors={this.props.clearTagErrors} noteId={this.props.id} 
        tags={this.props.tags} removeTagging={this.props.removeTagging} />
      )
    }
  }

  render(){
    const expanded = this.state.expanded ? "full-page" : "";
    const wide = this.props.wideNote === "wide" ? "wide" : "";
    const toolbar = [
      [{ 'header': [1, 2, 3, 4, false] }],
      [{ 'font': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],

      [{ 'size': ['small', false, 'large', 'huge'] }],
      
      [{ 'align': [] }],

      ['blockquote', 'code-block'],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      ['link', 'image', 'video'],
      ['clean']
    ];
    return (
      <div className={`note-panel ${expanded} ${wide}`}>
        {this.renderThreeDots()}
        <div className="note-form">
          <form>
            <div className="input-fields">
              <input className="title-input" type="title" value={this.state.title} 
                onChange={this.handleTitleChange} placeholder="Title" onFocus={() => {
                  this.setState({ focus: false }) 
                }} tabIndex="1" />
              <ReactQuill
                className={this.state.focus ? "focused" : "blurred"}
                theme="snow"
                modules={{ toolbar }}
                value={this.state.content}
                ref={editor => { this.editor = editor; }}
                placeholder={"Start writing here..."}
                onChange={this.handleEditorChange}
                onFocus={this.revealToolbar}
              >
              </ReactQuill>
            </div>
          </form>
        </div>
        <div className="tag-footer">
          {this.renderTagForm()}
        </div>
      </div>
    )
  }

}

export default withRouter(NoteForm);