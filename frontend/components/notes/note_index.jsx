import React from 'react';
import NoteIndexItem from './note_index_item';
import { Link } from 'react-router-dom';

class NoteIndex extends React.Component {
  componentDidMount() {
    this.props.fetchNotes();
  }

  render() {
    const { notes } = this.props;
    const noteList = notes.map(note => {
      return <NoteIndexItem key={note.id} note={note} deleteNote={this.props.deleteNote} />
    });
    return (
      <div>
        <Link to={'/notes/new'}><button>New Note</button></Link>
        <h2>All Notes</h2>
        <ul>{noteList}</ul>
      </div>
    )
  }
}

export default NoteIndex;