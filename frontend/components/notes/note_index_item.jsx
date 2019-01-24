import React from 'react';
import { Link } from 'react-router-dom';
import { format, render, cancel, register } from 'timeago.js';


const NoteIndexItem = (props) => {
  // const timeAgo = new TimeAgo('en-US');
  // TimeAgo.addLocale(en);
  return (
    <Link to={`/notes/${props.note.id}/edit`}><div className="single-note">
      <div className="top">
        <p className="note-title">{props.note.title}</p>
        <p className="note-content">{props.note.content}</p>
      </div>
      <div className="timestamp">
        <p className="note-updated">{format(props.note.updated_at)}</p>
      </div>
      {/* <button className="delete-btn" onClick={() => props.deleteNote(props.note.id)}>Delete Note</button> */}
    </div></Link>
  )
}

export default NoteIndexItem;