import { RECEIVE_NOTEBOOK, RECEIVE_NOTEBOOKS, REMOVE_NOTEBOOK } from "../actions/notebook_actions";
import { merge } from 'lodash';

const notebooksReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_NOTEBOOKS:
      return merge({}, state, action.notebooks);
    case RECEIVE_NOTEBOOK:
      newState = merge({}, state);
      newState[action.note.id] = action.notebook;
      return newState;
    case REMOVE_NOTEBOOK:
      newState = merge({}, state);
      delete newState[action.notebookId];
      return newState;
    default:
      return state;
  }
};

export default notebooksReducer;