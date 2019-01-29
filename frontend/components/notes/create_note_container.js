import { connect } from 'react-redux';
import { createNote } from '../../actions/note_actions';
import NoteForm from './note_form';

const mapStateToProps = (state, ownProps) => {
  const notebookId = ownProps.match.params.notebookId;
  return {
    note: { title: '', content: '', notebook: { title: '' } },
    formType: 'Create',
    notebookId: notebookId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    action: (note) => dispatch(createNote(note))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);