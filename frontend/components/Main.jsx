import React from 'react';
import NoteIndexContainer from './notes/note_index_container';
import { Link } from 'react-router-dom';

const Main = (props) => (
  <div className="main-content">
    <div className="columns">
      <div className="side-nav">
        <div className="user-info">
          <h2 className="email">{props.currentUser.email}</h2>
          <button onClick={props.logout}>Logout</button>
          <div className="new-note">
            <Link to={'/notes/new'}><img className="new-note-img" src={window.newnoteURL}/><button>New Note</button></Link>
          </div>
        </div>
      </div>
      <div className="note-sidebar">
        <h2>All Notes</h2>
        <NoteIndexContainer />
      </div>
    </div>
  </div>
);

export default Main;