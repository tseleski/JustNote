import React from 'react';
import NoteIndexContainer from './notes/note_index_container';
import { Link } from 'react-router-dom';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = { popup: false};
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup() {
    this.setState({ popup: !this.state.popup });
  }

  renderEmail(){
    const popup = this.state.popup ? "show" : "hide";
    return (
      <div className="email">
        <div className="email-icon">
          <svg onClick={this.togglePopup} width="32" height="32" viewBox="0 0 32 32">
            <circle cx="15" cy="15" r="13" fill="gray" stroke-width="0.5" stroke="white"></circle>
            <text x="50%" y="50%" text-anchor="middle" stroke="white" stroke-width="2px" stroke-opacity="0.8" dy=".3em">{this.props.currentUser.email[0].toUpperCase()}</text>
          </svg>
          <h2 onClick={this.togglePopup} className="top-email">{this.props.currentUser.email}</h2>
        </div>
        <div className={`logout-popup ${popup}`}>
          <div className="logout-popup-items">
            <p>Account</p>
            <h3 className="account-email">{this.props.currentUser.email}</h3>
            <button onClick={this.props.logout} className="logout-btn">Sign out {this.props.currentUser.email}</button>
          </div>
        </div>
      </div>
    )
  }

  renderLinks(){
    return (
      <ul className="links">
        <li key="1"><Link to={'/'}><i className="fa fa-sticky-note"></i>All Notes</Link></li>
        <li key="2"><i class="fa fa-book"></i>Notebooks</li>
        <li key="3"><i class="fa fa-hashtag"></i>Tags</li>
      </ul>
    )
  }

  render(){
    return (
      <div className="main-content">
        <div className="columns">
          <div className="side-nav">
            <div className="top">
              {this.renderEmail()}
              <div className="new-note">
                <Link to={'/notes/new'}><img className="new-note-img" src={window.newnoteURL} /><button>New Note</button></Link>
              </div>
            </div>
          {this.renderLinks()}
          </div>
          <div className="note-sidebar">
            <NoteIndexContainer />
          </div>
        </div>
      </div>
    )
  }
} 

export default Main;