import React from 'react';
import NoteIndexItem from './note_index_item';
import { Link } from 'react-router-dom';

class NoteIndex extends React.Component {
  componentDidMount() {
    this.props.fetchNotes();
  }

  noteCount(){
    if (this.props.notes.length === 1) {
      return (
        <p className="note-count">{this.props.notes.length} note</p>
      )
    } else {
      return (
        <p className="note-count">{this.props.notes.length} notes</p>
      )
    }
     
  }

  render() {
    const { notes } = this.props;
    const noteList = notes.map(note => {
      return <NoteIndexItem key={note.id} note={note} deleteNote={this.props.deleteNote} />
    });
    return (
      <div className="second-column">
        <div className="fixed-header">
          <h2>All Notes</h2>
          {this.noteCount()}
        </div>
        <div className="clearfix"></div>
        <ul className="all-notes">{noteList}</ul>
      </div>
    )
  }
}

export default NoteIndex;