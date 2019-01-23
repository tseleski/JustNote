import { connect } from 'react-redux';
import { createNote } from '../../actions/note_actions';
import NoteForm from './note_form';

const mapStateToProps = state => {
  return {
    note: { title: '', content: ''},
  };
};

const mapDispatchToProps = dispatch => {
  return {
    action: (note) => dispatch(createNote(note))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);