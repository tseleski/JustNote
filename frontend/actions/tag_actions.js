import * as TagAPIUtil from '../util/tag_api_util';
export const RECEIVE_TAG  = 'RECEIVE_TAG';
export const RECEIVE_TAGS  = 'RECEIVE_TAGS';
export const REMOVE_TAG  = 'REMOVE_TAG';
export const CLEAR_TAGS  = 'CLEAR_TAGS';
export const RECEIVE_TAG_ERRORS = 'RECEIVE_TAG_ERRORS';
export const CLEAR_TAG_ERRORS = 'CLEAR_TAG_ERRORS';

const receiveTag = (tag) => {
  return {
    type: RECEIVE_TAG,
    tag
  };
};

const receiveTags = (tags) => {
  return {
    type: RECEIVE_TAGS,
    tags
  };
};

const removeTag = (tag) => {
  return {
    type: REMOVE_TAG,
    tagId: tag.id
  };
};

export const clearTags = () => {
  return {
    type: CLEAR_TAGS,
  };
};

const receiveErrors = (errors) => {
  return {
    type: RECEIVE_TAG_ERRORS,
    errors
  };
};

export const clearTagErrors = () => {
  return {
    type: CLEAR_TAG_ERRORS
  };
};

export const fetchTags = () => dispatch => {
  return TagAPIUtil.fetchTags().then(
    tags => dispatch(receiveTags(tags))
  );
};

export const fetchTag = id => dispatch => {
  return TagAPIUtil.fetchTag(id).then(
    tag => dispatch(receiveTag(tag))
  );
};

export const createTag = (tag) => dispatch => {
  return TagAPIUtil.createTag(tag).then(
    tag => dispatch(receiveTag(tag)),
    err => dispatch(receiveErrors(err.responseJSON))
  );
};

export const deleteTag = (id) => dispatch => {
  return TagAPIUtil.deleteTag(id).then(
    tag => dispatch(removeTag(tag))
  );
};