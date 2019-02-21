import Search from './search';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { searchNotes, receiveQuery } from '../../actions/note_actions';

const mapStateToProps = (state, ownProps) => {
  
  const notebookId = ownProps.location.pathname.match(/notebooks\/([0-9]*)/) ? ownProps.location.pathname.match(/notebooks\/([0-9]*)/)[1] : '';
  const tagId = ownProps.location.pathname.match(/tags\/([0-9]*)/) ? ownProps.location.pathname.match(/tags\/([0-9]*)/)[1] : '';
  const query = state.ui.query ? state.ui.query: '';
  return {
    query: query,
    notebookId: notebookId,
    tagId: tagId,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    search: (query) => dispatch(searchNotes(query)),
    receiveQuery: (query) => dispatch(receiveQuery(query)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));