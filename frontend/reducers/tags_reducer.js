import { RECEIVE_TAG, REMOVE_TAG, RECEIVE_TAGS, CLEAR_TAGS } from '../actions/tag_actions';
import { RECEIVE_NOTE } from '../actions/note_actions';
import { merge } from 'lodash';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';

const tagsReducer = (state = {}, action ) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_TAGS:
      return merge({}, action.tags);
    case RECEIVE_NOTE:
      return action.tags;
    case RECEIVE_TAG:
      newState = merge({}, state);
      newState[action.tag.id] = action.tag;
      return newState;
    case REMOVE_TAG:
      newState = merge({}, state);
      delete newState[action.tagId];
      return newState;
    case CLEAR_TAGS:
      return {};
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};

export default tagsReducer;