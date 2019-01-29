import { connect } from 'react-redux';
import { fetchNotes, createNote, deleteNote, clearNotes } from '../../actions/note_actions';
import { fetchNotebook } from '../../actions/notebook_actions';
import NoteIndex from './note_index';

const mapStateToProps = (state, ownProps) => {
  function sortFunction(a, b) {
    var dateA = new Date(a.updated_at).getTime();
    var dateB = new Date(b.updated_at).getTime();
    return dateA > dateB ? -1 : 1;
  }
  const allNotes = Object.values(state.entities.notes);
  const sorted_notes = allNotes.sort(sortFunction);
  const notebook = state.entities.notebooks[ownProps.match.params.notebookId] || {};
  const title = notebook.title || 'Notebook Title';
  return {
    notes: sorted_notes,
    notebookId: ownProps.match.params.notebookId,
    notebook: notebook,
    title: title,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNote: note => dispatch(createNote(note)),
    deleteNote: id => dispatch(deleteNote(id)),
    fetchNotebook: id => dispatch(fetchNotebook(id)),
    clearNotes: () => dispatch(clearNotes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteIndex);