import { RECEIVE_NOTE_ERRORS, CLEAR_NOTE_ERRORS } from "../actions/note_actions";


const noteErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_NOTE_ERRORS:
      debugger
      return action.errors;
    case CLEAR_NOTE_ERRORS:
      return [];
    default:
      return state;
  }
};

export default noteErrorsReducer;