import Search from './search';
import { connect } from 'react-redux';
import { searchNotes } from '../../actions/note_actions';

const mapDispatchToProps = (dispatch) => {
  return {
    search: (query) => dispatch(searchNotes(query)),
  };
};

export default connect(null, mapDispatchToProps)(Search);