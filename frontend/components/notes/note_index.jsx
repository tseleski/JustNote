import React from 'react';
import NoteIndexItem from './note_index_item';
import Loading from '../loader';

class NoteIndex extends React.Component {
  componentDidMount() {
    if(this.props.filterType === 'All'){
      this.props.fetchNotes();
    } else if (this.props.filterType === 'Notebook'){
      this.props.fetchNotebook(this.props.notebookId);
      this.props.clearQuery();
    } else if (this.props.filterType === 'Tag'){
      this.props.fetchTag(this.props.tagId);
      this.props.clearQuery();
    } 
    // else if (this.props.filterType === 'Search') {
    //   this.props.searchNotes(this.props.query);
    // }
  }

  componentDidUpdate(prevProps){
    if (this.props.filterType === 'Notebook'){
      if (prevProps.notebookId !== this.props.notebookId) {
        this.props.fetchNotebook(this.props.notebookId);
      }
    } else if (this.props.filterType === 'Tag'){
      if (prevProps.tagId !== this.props.tagId) {
        this.props.fetchTag(this.props.tagId);
      }
    } 
  }

  componentWillUnmount(){
    if(!this.props.history.location.pathname === "/search"){
      this.props.clearNotes();
    }
  }

  noteCount(){
    const found = this.props.filterType === 'Search' ? "found" : "";
    if (this.props.notes.length === 1) {
      return (
        <p className="note-count">{`${this.props.notes.length} note ${found}`}</p>
      )
    } else {
      return (
        <p className="note-count">{`${this.props.notes.length} notes ${found}`}</p>
      )
    }
  }


  render() {
    const { notes } = this.props;
    const noteList = notes.map(note => {
      return <NoteIndexItem key={note.id} note={note} deleteNote={this.props.deleteNote}
      fetchNotebook={this.props.fetchNotebook} title={this.props.title} 
      notebook={this.props.notebook} filterType={this.props.filterType}
      tag={this.props.tag} />
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