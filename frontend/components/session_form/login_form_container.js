import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login, clearSessionErrors, demoLogin } from '../../actions/session_actions';


const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors.session,
    formType: 'Sign In'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    clearSessionErrors: () => dispatch(clearSessionErrors()),
    demoLogin: () => dispatch(demoLogin())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);