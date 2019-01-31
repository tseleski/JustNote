import { connect } from 'react-redux';
import Greeting from './greeting';
import { logout } from '../../actions/session_actions';

const mapStateToProps = ({ session, entities: { users }}, ownProps) => {
  // put regex here!!
  // for "notebooks/(###)/"
  // var regex = '/notebooks\/([0-9]*)\//';
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);