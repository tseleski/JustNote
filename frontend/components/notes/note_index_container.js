import { connect } from 'react-redux';
import { fetchNotes, createNote, deleteNote, clearNotes } from '../../actions/note_actions';
import { fetchNotebook } from '../../actions/notebook_actions';
import NoteIndex from './note_index';

const mapStateToProps = state => {
  function sortFunction(a, b) {
    var dateA = new Date(a.updated_at).getTime();
    var dateB = new Date(b.updated_at).getTime();
    return dateA > dateB ? -1 : 1;
  }
  const sorted_notes = Object.values(state.entities.notes).sort(sortFunction);
  return {
    notes: sorted_notes,
    title: 'All Notes',
    filterType: 'All'
  };
};

const mapDispatchToProps = dispatch => {
  return{
    fetchNotes: () => dispatch(fetchNotes()),
    createNote: note => dispatch(createNote(note)),
    deleteNote: id => dispatch(deleteNote(id)),
    fetchNotebook: id => dispatch(fetchNotebook(id)),
    clearNotes: () => dispatch(clearNotes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteIndex);