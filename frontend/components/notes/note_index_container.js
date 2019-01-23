import { connect } from 'react-redux';
import { fetchNotes, createNote, deleteNote } from '../../actions/note_actions';
import NoteIndex from './note_index';

const mapStateToProps = state => {
  return {
    notes: Object.values(state.entities.notes)
  };
};

const mapDispatchToProps = dispatch => {
  return{
    fetchNotes: () => dispatch(fetchNotes()),
    createNote: note => dispatch(createNote(note)),
    deleteNote: (id) => dispatch(deleteNote(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteIndex);