import { connect } from 'react-redux';
import { fetchNote, createNote } from '../../actions/note_actions';
import React from 'react';
import NoteForm from './note_form';

class EditNoteForm extends React.Component {
  componentDidMount() {
    this.props.fetchNote(this.props.match.params.noteId);
  }

  componentDidUpdate(prevProps) {
    debugger
    if (prevProps.note.id != this.props.match.params.noteId) {
      debugger
      this.props.fetchNote(this.props.match.params.noteId);
      debugger
    }
  }

  render() {
    const { action, note } = this.props;
    debugger
    return (
      <NoteForm action={action} note={note} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const defaultNote = { title: '', content: '' };
  const note = state.entities.notes[ownProps.match.params.noteId] || defaultNote;
  return {
    note: note
  };
};

const mapDispatchToProps = dispatch => {
  return {
    action: (note) => dispatch(createNote(note)),
    fetchNote: (id) => dispatch(fetchNote(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNoteForm);