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
        <h2 onClick={this.togglePopup} className="top-email">{this.props.currentUser.email}</h2>
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
        <li key="1"><Link to={'/'}>All Notes</Link></li>
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
            <h2>All Notes</h2>
            <NoteIndexContainer />
          </div>
        </div>
      </div>
    )
  }
} 

export default Main;