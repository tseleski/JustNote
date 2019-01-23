import { connect } from 'react-redux';
import { fetchNote, updateNote } from '../../actions/note_actions';
import React from 'react';
import NoteForm from './note_form';

class EditNoteForm extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.note.id != this.props.match.params.noteId) {
      this.props.fetchNote(this.props.match.params.noteId);
    }
  }

  render() {
    const { action, note, formType, fetchNote } = this.props;
    const id = this.props.match.params.noteId;
    debugger
    return (
      <NoteForm action={action} id={id} note={note} formType={formType} fetchNote={fetchNote} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const defaultNote = { title: '', content: '' };
  const note = state.entities.notes[ownProps.match.params.noteId] || defaultNote;
  return {
    note: note,
    formType: 'Edit'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    action: (note) => dispatch(updateNote(note)),
    fetchNote: (id) => dispatch(fetchNote(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNoteForm);