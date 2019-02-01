import { RECEIVE_NOTE, RECEIVE_NOTES, REMOVE_NOTE, CLEAR_NOTES } from "../actions/note_actions";
import { RECEIVE_NOTEBOOK } from '../actions/notebook_actions';
import { RECEIVE_TAG } from '../actions/tag_actions';
import { merge } from 'lodash';
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";

const notesReducer = (state = {}, action) => {
  debugger
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_NOTES:
      return merge({}, action.notes);
    case RECEIVE_NOTE:
      debugger
      newState = merge({}, state);
      newState[action.note.id] = action.note;
      return newState;
    case REMOVE_NOTE:
      newState = merge({}, state);
      delete newState[action.noteId];
      return newState;
    case RECEIVE_NOTEBOOK:
      const notes = action.notes || {};
      return notes;
    case RECEIVE_TAG:
      const tagNotes = action.notes || {};
      newState = merge({}, state, tagNotes);
      return newState;
    case CLEAR_NOTES:
      return {};
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};

export default notesReducer;