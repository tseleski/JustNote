import { connect } from 'react-redux';
import { fetchNotes, createNote, deleteNote } from '../../actions/note_actions';
import { fetchNotebook } from '../../actions/notebook_actions';
import NoteIndex from './note_index';

const mapStateToProps = (state, ownProps) => {
  function sortFunction(a, b) {
    var dateA = new Date(a.updated_at).getTime();
    var dateB = new Date(b.updated_at).getTime();
    return dateA > dateB ? -1 : 1;
  }
  const allNotes = Object.values(state.entities.notes);
  const filteredNotes = allNotes.filter(note => (note.notebook_id === ownProps.match.params.notebookId));
  const sorted_notes = filteredNotes.sort(sortFunction);
  debugger
  const notebook = state.entities.notebooks[ownProps.match.params.notebookId] || {};
  return {
    notes: sorted_notes,
    title: notebook
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNote: note => dispatch(createNote(note)),
    deleteNote: id => dispatch(deleteNote(id)),
    fetchNotebook: id => dispatch(fetchNotebook(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteIndex);