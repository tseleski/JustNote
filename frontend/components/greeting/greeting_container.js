import { connect } from 'react-redux';
import Greeting from './greeting';
import { logout } from '../../actions/session_actions';
import { createNote, clearQuery } from '../../actions/note_actions';
import { fetchNotebooks } from '../../actions/notebook_actions';

const mapStateToProps = ({ session, entities: { users, notebooks }}, ownProps) => {
  const notebookResult = ownProps.location.pathname.match(/notebooks\/([0-9]*)/);
  let notebookId = notebookResult || "";
  if( notebookId !== ""){
    notebookId = notebookResult[1];
  }  
  const tagResult = ownProps.location.pathname.match(/tags\/([0-9]*)/);
  let tagId = tagResult || "";
  if (tagId !== "") {
    tagId = tagResult[1];
  } 
  return {
    currentUser: users[session.id],
    notebookId: notebookId,
    tagId: tagId,
    notebooks: Object.values(notebooks),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    createNote: note => dispatch(createNote(note)), 
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    clearQuery: () => dispatch(clearQuery()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);