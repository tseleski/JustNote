import { connect } from 'react-redux';
import Greeting from './greeting';
import { logout } from '../../actions/session_actions';

const mapStateToProps = ({ session, entities: { users }}, ownProps) => {
  // put regex here!!
  // for "notebooks/(###)/"
  // var regex = '/notebooks\/([0-9]*)\//';
  const result = ownProps.location.pathname.match(/notebooks\/([0-9]*)/);
  let notebookId = result || "";
  if( notebookId !== ""){
    notebookId = result[1];
  }  
  // const notebookId = ownProps.location.pathname.slice(11, 13) || "";
  return {
    currentUser: users[session.id],
    notebookId: notebookId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);