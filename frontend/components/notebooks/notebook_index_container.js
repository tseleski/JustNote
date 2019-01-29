import { connect } from 'react-redux';
import { fetchNotebooks, createNotebook, deleteNotebook, clearNotebookErrors, updateNotebook, fetchNotebook } from '../../actions/notebook_actions';
import NotebookIndex from './notebook_index';
import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions'; 

const mapStateToProps = state => {
  const notes = Object.values(state.entities.notes) || {};
  return {
    notes: notes,
    notebooks: Object.values(state.entities.notebooks),
    currentUser: state.entities.users[state.session.id],
    errors: state.errors.notebooks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    createNotebook: notebook => dispatch(createNotebook(notebook)),
    deleteNotebook: id => dispatch(deleteNotebook(id)),
    updateNotebook: notebook => dispatch(updateNotebook(notebook)),
    fetchNotebook: id => dispatch(fetchNotebook(id)),
    logout: () => dispatch(logout()),
    clearNotebookErrors: () => dispatch(clearNotebookErrors()),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotebookIndex);