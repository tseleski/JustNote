import { connect } from 'react-redux';
import { fetchNote, updateNote, deleteNote } from '../../actions/note_actions';
import { fetchNotebooks } from '../../actions/notebook_actions';
import React from 'react';
import NoteForm from './note_form';

class EditNoteForm extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.note.id != this.props.match.params.noteId) {
      this.props.fetchNote(this.props.match.params.noteId);
    }
  }

  render() {
    const { action, note, formType, fetchNote, deleteNote } = this.props;
    const id = this.props.match.params.noteId;
    return (
      <NoteForm action={action} id={id} note={note} formType={formType} 
      fetchNote={fetchNote} deleteNote={deleteNote} notebook={this.props.notebook}
      fetchNotebooks={this.props.fetchNotebooks} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const defaultNote = { title: '', content: '', notebook: { title: ''} };
  const note = state.entities.notes[ownProps.match.params.noteId] || defaultNote;
  const notebook = state.entities.notebooks[note.notebook_id] || {};
  return {
    note: note,
    formType: 'Edit',
    notebook: notebook.title,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    action: (note) => dispatch(updateNote(note)),
    fetchNote: (id) => dispatch(fetchNote(id)),
    deleteNote: (id) => dispatch(deleteNote(id)),
    fetchNotebooks: () => dispatch(fetchNotebooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNoteForm);