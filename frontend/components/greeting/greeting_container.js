import { connect } from 'react-redux';
import Greeting from './greeting';
import { logout } from '../../actions/session_actions';

const mapStateToProps = ({ session, entities: { users }}, ownProps) => {
  //  put regex here!!
  const notebookId = ownProps.location.pathname.slice(11, 13) || "";
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