import { 
  START_LOADING_ALL_NOTES, 
  START_LOADING_NOTE,
  RECEIVE_NOTES,
  RECEIVE_NOTE,
  RECEIVE_NOTE_ERRORS,
  } from "../actions/note_actions";
import { RECEIVE_NOTEBOOK } from '../actions/notebook_actions';
import { RECEIVE_TAG } from '../actions/tag_actions';
import { merge } from 'lodash';
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";

const initialState = {
  noteIndexLoading: false,
  noteShowLoading: false
};

const loadingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_NOTES:
      return Object.assign({}, state, { noteIndexLoading: false });
    case RECEIVE_NOTE:
      return Object.assign({}, state, { noteShowLoading: false });
    case RECEIVE_NOTE_ERRORS:
      return Object.assign({}, state, { noteShowLoading: false });
    case START_LOADING_ALL_NOTES:
      return Object.assign({}, state, { noteIndexLoading: true });
    case START_LOADING_NOTE:
      return Object.assign({}, state, { noteShowLoading: true });
    default:
      return state;
  }
};

export default loadingReducer;