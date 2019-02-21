import { connect } from 'react-redux';
import { createNote, deleteNote, clearNotes, clearQuery, searchNotes } from '../../actions/note_actions';
import NoteIndex from './note_index';

const mapStateToProps = (state, ownProps) => {
  function sortFunction(a, b) {
    var dateA = new Date(a.updated_at).getTime();
    var dateB = new Date(b.updated_at).getTime();
    return dateA > dateB ? -1 : 1;
  }
  const allNotes = Object.values(state.entities.notes);
  const sorted_notes = allNotes.sort(sortFunction);
  const query = state.ui.query || '';
  // let subtitle = '';
  // if (ownProps.match.params.notebookId){
  //   subtitle = state.entities.notebooks[ownProps.match.params.notebookId].title || '';
  // } else if (ownProps.match.params.tagId){
  //   subtitle = state.entities.tags[ownProps.match.params.tagId].name || '';
  // }
  return {
    notes: sorted_notes,
    query: query,
    title: `Results for "${query}"`,
    filterType: 'Search',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNote: note => dispatch(createNote(note)),
    deleteNote: id => dispatch(deleteNote(id)),
    clearNotes: () => dispatch(clearNotes()),
    clearQuery: () => dispatch(clearQuery()),
    searchNotes: query => dispatch(searchNotes(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteIndex);