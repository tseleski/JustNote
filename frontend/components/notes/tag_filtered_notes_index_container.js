import { connect } from 'react-redux';
import { createNote, deleteNote, clearNotes } from '../../actions/note_actions';
import { fetchTag } from '../../actions/tag_actions';
import NoteIndex from './note_index';

const mapStateToProps = (state, ownProps) => {
  function sortFunction(a, b) {
    var dateA = new Date(a.updated_at).getTime();
    var dateB = new Date(b.updated_at).getTime();
    return dateA > dateB ? -1 : 1;
  }
  const allNotes = Object.values(state.entities.notes);
  const sorted_notes = allNotes.sort(sortFunction);
  const tag = state.entities.tags[ownProps.match.params.tagId] || {};
  const tagId = ownProps.match.params.tagId;
  const filteredNotes = sorted_notes.filter(note => {

    return note.tag_ids.includes(parseInt(tagId));
  });
  const title = tag.name || '';
  return {
    notes: filteredNotes,
    tagId: tagId,
    tag: tag,
    title: title,
    filterType: 'Tag',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNote: note => dispatch(createNote(note)),
    deleteNote: id => dispatch(deleteNote(id)),
    fetchTag: id => dispatch(fetchTag(id)),
    clearNotes: () => dispatch(clearNotes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteIndex);