import React from 'react';
import { Link } from 'react-router-dom';

const NoteIndexItem = (props) => {
  return (
    <div>
      <Link to={`/notes/${props.note.id}/edit`}><p className="note-title">{props.note.title}</p></Link>
      <Link to={`/notes/${props.note.id}/edit`}><p className="note-content">{props.note.content}</p></Link>
      <button className="delete-btn" onClick={() => props.deleteNote(props.note.id)}>Delete Note</button>
    </div>
  )
}

export default NoteIndexItem;