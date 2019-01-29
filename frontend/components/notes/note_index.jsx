import React from 'react';
import NoteIndexItem from './note_index_item';
import { Link } from 'react-router-dom';

class NoteIndex extends React.Component {
  componentDidMount() {
    if(this.props.title === "All Notes"){
      this.props.fetchNotes();
    } else {
      this.props.fetchNotebook(this.props.notebookId);
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.title !== 'All Notes'){
      if (prevProps.notebookId !== this.props.notebookId) {
        this.props.fetchNotebook(this.props.notebookId);
      }
    }    
  }

  componentWillUnmount(){
    this.props.clearNotes();
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
      return <NoteIndexItem key={note.id} note={note} deleteNote={this.props.deleteNote}
      fetchNotebook={this.props.fetchNotebook} title={this.props.title} notebook={this.props.notebook} />
    });
    return (
      <div className="note-sidebar">
        <div className="second-column">
          <div className="fixed-header">
            <h2>{this.props.title}</h2>
            {this.noteCount()}
          </div>
          <ul className="all-notes">{noteList}</ul>
        </div>
      </div>
    )
  }
}

export default NoteIndex;