import { connect } from 'react-redux';
import { fetchNotebooks, createNotebook, deleteNotebook } from '../../actions/notebook_actions';
import NotebookIndex from './notebook_index';
import { logout } from '../../actions/session_actions';

const mapStateToProps = state => {
  return {
    notebooks: Object.values(state.entities.notebooks),
    currentUser: state.entities.users[state.session.id],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    createNotebook: notebook => dispatch(createNotebook(notebook)),
    deleteNotebook: (id) => dispatch(deleteNotebook(id)),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotebookIndex);