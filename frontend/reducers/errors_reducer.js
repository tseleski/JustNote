import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import noteErrorsReducer from './note_errors_reducer';
import notebookErrorsReducer from './notebook_errors_reducer';
import tagErrorsReducer from './tag_errors_reducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  notes: noteErrorsReducer,
  notebooks: notebookErrorsReducer,
  tags: tagErrorsReducer,
});

export default errorsReducer;