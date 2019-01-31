import { connect } from 'react-redux';
import { createNote } from '../../actions/note_actions';
import { fetchNotebooks } from '../../actions/notebook_actions';
import NoteForm from './note_form';

const mapStateToProps = (state, ownProps) => {
  const notebookId = ownProps.match.params.notebookId;
  const tagId = ownProps.match.params.tagId;
  return {
    note: { title: '', content: '', plain_text: '', notebook: { title: '' } },
    formType: 'Create',
    notebookId: notebookId,
    tagId: tagId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    action: (note) => dispatch(createNote(note)),
    fetchNotebooks: () => dispatch(fetchNotebooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);