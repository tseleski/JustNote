import * as NoteAPIUtil from '../util/note_api_util';
export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const RECEIVE_NOTE = 'RECEIVE_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const RECEIVE_NOTE_ERRORS = 'RECEIVE_NOTE_ERRORS';
export const CLEAR_NOTE_ERRORS = 'CLEAR_NOTE_ERRORS';


const receiveNotes = (notes) => {
  return {
    type: RECEIVE_NOTES,
    notes
  };
};

const receiveNote = (note) => {
  return {
    type: RECEIVE_NOTE,
    note
  };
};

const removeNote = (note) => {
  return {
    type: REMOVE_NOTE,
    noteId: note.id
  };
};

const receiveErrors = (errors) => {
  return {
    type: RECEIVE_NOTE_ERRORS,
    errors
  };
};

export const clearNoteErrors = () => {
  return {
    type: CLEAR_NOTE_ERRORS
  };
};

export const fetchNotes = () => dispatch => {
  return NoteAPIUtil.fetchNotes().then(
    notes => dispatch(receiveNotes(notes))
  );
};

export const fetchNote = (id) => dispatch => {
  return NoteAPIUtil.fetchNote(id).then(
    note => {
      return dispatch(receiveNote(note))
    }
  );
};

export const createNote = (note) => dispatch => {
  return NoteAPIUtil.createNote(note).then(
    note => dispatch(receiveNote(note)),
    err => dispatch(receiveErrors(err.responseJSON))
  );
};

export const updateNote = (note) => dispatch => {
  return NoteAPIUtil.updateNote(note).then(
    note => dispatch(receiveNote(note)),
    err => dispatch(receiveErrors(err.responseJSON))
  );
};

export const deleteNote = (id) => dispatch => {
  return NoteAPIUtil.deleteNote(id).then(
    note =>  dispatch(removeNote(note))
  );
};
