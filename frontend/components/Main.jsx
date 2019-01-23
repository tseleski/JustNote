import React from 'react';
import NoteIndexContainer from './notes/note_index_container';
import { Link } from 'react-router-dom';

const Main = (props) => (
  <div className="side-nav">
    <div className="left-section">
      <h2>{props.currentUser.email}</h2>
      <button onClick={props.logout}>Logout</button>
      <Link to={'/notes/new'}><button className="new-note">New Note</button></Link>
    </div>
    <div className="all-notes">
      <NoteIndexContainer />
    </div>
  </div>
);

export default Main;