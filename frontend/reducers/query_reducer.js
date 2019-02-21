import { RECEIVE_QUERY, CLEAR_QUERY } from '../actions/note_actions';

export default function queryReducer(state = '', action) {
  switch (action.type) {
    case RECEIVE_QUERY:
      return action.query;
    case CLEAR_QUERY:
      return '';
    default:
      return state;
  }
}