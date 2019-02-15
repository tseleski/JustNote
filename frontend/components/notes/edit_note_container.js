import { connect } from 'react-redux';
import { fetchNote, updateNote, deleteNote, startLoadingNote, clearNoteErrors } from '../../actions/note_actions';
import { fetchNotebooks } from '../../actions/notebook_actions';
import { createTag, clearTagErrors, removeTagging } from '../../actions/tag_actions';
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
      fetchNotebooks={this.props.fetchNotebooks} createTag={this.props.createTag}
      tagErrors={this.props.tagErrors} clearTagErrors={this.props.clearTagErrors} 
      tags={this.props.tags} removeTagging={this.props.removeTagging}
      startLoadingNote={this.props.startLoadingNote}
      loading={this.props.loading} errors={this.props.errors}
      clearNoteErrors={this.props.clearNoteErrors} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const defaultNote = { title: '', content: '', plain_text: '', tag_ids: []};
  const note = state.entities.notes[ownProps.match.params.noteId] || defaultNote;
  if(note.title === "Untitled" || note.title === ''){
    note.title = "";
  }
  debugger
  const notebook = state.entities.notebooks[note.notebook_id] || {};
  const noteTags = note.tag_ids.map(tag_id => {
    return state.entities.tags[tag_id];
  }).filter(tag => tag);
  return {
    note: note,
    formType: 'Edit',
    notebook: notebook,
    tagErrors: state.errors.tags,
    tags: noteTags,
    loading: state.ui.loading.noteShowLoading,
    errors: state.errors.notes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    action: (note) => dispatch(updateNote(note)),
    fetchNote: (id) => dispatch(fetchNote(id)),
    deleteNote: (id) => dispatch(deleteNote(id)),
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    createTag: tag => dispatch(createTag(tag)),
    clearTagErrors: () => dispatch(clearTagErrors()),
    removeTagging: (tagging) => dispatch(removeTagging(tagging)),
    startLoadingNote: () => dispatch(startLoadingNote()),
    clearNoteErrors: () => dispatch(clearNoteErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNoteForm);