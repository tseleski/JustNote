import * as SessionAPIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";
export const RECEIVE_VALID_EMAIL = "RECEIVE_VALID_EMAIL";

const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER
  };
};

const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};

export const clearSessionErrors = () => {
  return {
    type: CLEAR_SESSION_ERRORS
  };
};

const receiveValidEmail = () => {
  return {
    type: RECEIVE_VALID_EMAIL,
  };
};

export const login = (user) => dispatch => {
  return SessionAPIUtil.login(user).then(
    user => dispatch(receiveCurrentUser(user)),
      err => dispatch(receiveErrors(err.responseJSON))
    );
};

export const logout = () => dispatch => {
  return SessionAPIUtil.logout().then(
    () => dispatch(logoutCurrentUser())
  );
};

export const signup = (user) => dispatch => {
  return SessionAPIUtil.signup(user).then(
    user => dispatch(receiveCurrentUser(user)),
    err => dispatch(receiveErrors(err.responseJSON))
  );
};

export const checkEmail = (user) => dispatch => {
  return SessionAPIUtil.checkEmail(user).then(
    () => dispatch(receiveValidEmail()),
    err => dispatch(receiveErrors(err.responseJSON))
  );
};