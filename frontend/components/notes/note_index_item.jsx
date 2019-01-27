import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';


const NoteIndexItem = (props) => {
  const limitedContent = (content) => {
    if (content.split('').length < 90){
      return content;
    } else {
      return content.substring(0, 90) + "...";
    } 
  };
  return (
    <Link to={`/notes/${props.note.id}/edit`}><div className="single-note">
      <div className="top">
        <p className="note-title">{props.note.title}</p>
        <p className="note-content">{limitedContent(props.note.plain_text)}</p>
      </div>
      <div className="timestamp">
        <p className="note-updated">{format(props.note.updated_at)}</p>
      </div>
    </div></Link>
  )
}

export default NoteIndexItem;