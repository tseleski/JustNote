import { RECEIVE_NOTEBOOK, RECEIVE_NOTEBOOKS, REMOVE_NOTEBOOK } from "../actions/notebook_actions";
import { RECEIVE_NOTE } from '../actions/note_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

const notebooksReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_NOTEBOOKS:
      return merge({}, state, action.notebooks);
    case RECEIVE_NOTEBOOK:
      newState = merge({}, state);
      newState[action.notebook.id] = action.notebook;
      return newState;
    case REMOVE_NOTEBOOK:
      newState = merge({}, state);
      delete newState[action.notebookId];
      return newState;
    case RECEIVE_NOTE:
      newState = merge({}, state);
      newState[action.notebook.id] = action.notebook;
      return newState;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};

export default notebooksReducer;