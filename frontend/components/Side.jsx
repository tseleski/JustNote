import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import LogoutPopup from './popups/logout_popup';
import SearchContainer from './search/search_container';

class Side extends React.Component {
  constructor(props) {
    super(props);
    this.state = { popup: false, notesSelected: false, notebooksSelected: false, 
      tagsSelected: false, notebooks: [], notebooksShow: false };
    this.togglePopup = this.togglePopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleNewNote = this.handleNewNote.bind(this);
    this.renderNotebooks = this.renderNotebooks.bind(this);
    this.toggleNotebooks = this.toggleNotebooks.bind(this);
  }

  componentDidMount(){
    this.props.fetchNotebooks().then(result => {
      this.setState({ notebooks: Object.values(result.notebooks)});
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notebooks !== this.props.notebooks) {
      this.setState({ notebooks: this.props.notebooks });
    }
  }

  togglePopup(e){
    e.stopPropagation();
    this.setState({ popup: !this.state.popup });
  }

  closePopup(){
    let target;
    if(event.relatedTarget){
      target = event.relatedTarget.className;
    }
    this.setState({ popup: false }, () => {
      if ( target === "logout-btn"){
        this.handleLogout();
      }
    });
  }

  handleLogout(){
    this.props.logout();
  }

  handleNewNote(){
    const that = this;
    this.props.createNote({title: 'Untitled', content: '', plain_text: '', 
    notebook_id: this.props.notebookId, tag_id: this.props.tagId, }).then((payload) => {
      if (that.props.history.location.pathname.match(/search/)) {
        that.props.history.push(`/new_note/${payload.note.id}/edit`);
      } else if (this.props.notebookId) {
        that.props.history.push(`/notebooks/${this.props.notebookId}/notes/${payload.note.id}/edit`);
      } else if (this.props.tagId) {
        that.props.history.push(`/tags/${this.props.tagId}/notes/${payload.note.id}/edit`);
      } else {
        that.props.history.push(`/notes/${payload.note.id}/edit`);
      }
    });
    this.props.clearQuery();
  }

  renderEmail() {
    const popup = this.state.popup ? "show" : "hide";
    return (
      <div className="email" onClick={this.togglePopup} onBlur={this.closePopup} tabIndex="0" >
        <div className="email-icon" >
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="15" cy="15" r="13" fill="gray" strokeWidth="0.5" stroke="white"></circle>
            <text x="50%" y="50%" textAnchor="middle" stroke="white" strokeWidth="2px" strokeOpacity="0.8" dy=".3em">{this.props.currentUser.email[0].toUpperCase()}</text>
          </svg>
          <h2 className="top-email">{this.props.currentUser.email}</h2>
        </div>
        <div className={`logout-popup ${popup}`} >
          <div className="logout-popup-items">
            <p>Account</p>
            <h3 className="account-email">{this.props.currentUser.email}</h3>
            <button onClick={this.handleLogout} className="logout-btn">Sign out {this.props.currentUser.email}</button>
          </div>
        </div>
      </div>
    )
  }

  renderCaret(){
    let caret;
    if (this.state.notebooksShow){
      caret = (
        <svg className="notebooks-show-caret" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M2 0l4 4-4 4z" fill="#ccc"></path></svg>
      )
    } else {
      caret = (
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M2 0l4 4-4 4z" fill="#ccc"></path></svg>
      )
    }

    return (
      <div onClick={this.toggleNotebooks}>
        {caret}
      </div>
    )
  }

  renderNotebooks(){
    if(this.state.notebooksShow){
      const notebookList = this.state.notebooks.map(notebook => {
        return (
          <div key={notebook.id}>
            <Link to={`/notebooks/${notebook.id}`}>
              <div className="side-nav-notebook-list-item">
                <i className="fa fa-book"></i>
                <div className="side-nav-notebook-list-item-title">{notebook.title}</div>
              </div>
            </Link>
          </div>
        )
      })
      return (
        <div className="side-nav-notebook-list">
          {notebookList}
        </div>
      );
    }
  }

  toggleNotebooks(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState({ notebooksShow: !this.state.notebooksShow });
  }

  renderLinks() {
    const notesSelected = (!this.props.history.location.pathname.match(/notebooks/) && !this.props.history.location.pathname.match(/tags/) ) ? "selected" : "";
    const notebooksSelected = this.props.history.location.pathname.match(/notebooks/) ? "selected" : "";
    const tagsSelected = this.props.history.location.pathname.match(/tags/) ? "selected" : "";
    const down = this.state.notebooksShow ? "down" : "";
    return (
      <ul className="links" onClick={this.props.clearQuery}>
        <Link to={'/notes'}>
          <li key="1" className={`${notesSelected}`} onClick={() => {
              this.setState({ notesSelected: true})
              this.setState({ notebooksSelected: false})
              this.setState({ tagsSelected: false})
            }}>
            <i className="fa fa-sticky-note"></i>
            <div>All Notes</div>
          </li>
        </Link>
        <Link to={'/notebooks'}>
          <li key="2" className={`${notebooksSelected}`} onClick={() => {
            this.setState({ notebooksSelected: true })
            this.setState({ notesSelected: false })
            this.setState({ tagsSelected: false })
          }}>
            {this.renderCaret()}
            <i className="fa fa-book"></i>
            <div>Notebooks</div>
          </li>
        </Link>
        {this.renderNotebooks()}
        <Link to={'/tags'}>
          <li key="3" className={`${tagsSelected}`} onClick={() => {
            this.setState({ tagsSelected: true })
            this.setState({ notesSelected: false })
            this.setState({ notebooksSelected: false })
          }}>
            <i className="fa fa-tag"></i>
            <div>Tags</div>
          </li>
        </Link>
      </ul>
    )
  }

  renderSearch(){
    return (
      <SearchContainer />
    )
  }

  render() {
    return (
      <div className="side-nav">
        <div className="top">
          {this.renderEmail()}
          {this.renderSearch()}
          <div className="new-note" onClick={this.handleNewNote}>
            <img className="new-note-img" src={window.newnoteURL} /><button>New Note</button>
          </div>
        </div>
        {this.renderLinks()}
      </div>
    )
  }
}

export default withRouter(Side);