import { combineReducers } from 'redux';

import modal from './modal_reducer';
import loading from './loading_reducer';
import query from './query_reducer';

export default combineReducers({
  modal,
  loading,
  query
});