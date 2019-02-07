import { connect } from 'react-redux';
import { createNote, deleteNote, clearNotes, fetcNotes } from '../../actions/note_actions';
import NoteIndex from './note_index';

const mapStateToProps = (state, ownProps) => {
  function sortFunction(a, b) {
    var dateA = new Date(a.updated_at).getTime();
    var dateB = new Date(b.updated_at).getTime();
    return dateA > dateB ? -1 : 1;
  }
  const allNotes = Object.values(state.entities.notes);
  const sorted_notes = allNotes.sort(sortFunction);
  const title = "All Notes";
  return {
    notes: sorted_notes,
    title: title,
    filterType: 'Search',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNote: note => dispatch(createNote(note)),
    deleteNote: id => dispatch(deleteNote(id)),
    clearNotes: () => dispatch(clearNotes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteIndex);