import * as NoteAPIUtil from '../util/note_api_util';
export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const RECEIVE_NOTE = 'RECEIVE_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const CLEAR_NOTES = 'CLEAR_NOTES';
export const RECEIVE_NOTE_ERRORS = 'RECEIVE_NOTE_ERRORS';
export const CLEAR_NOTE_ERRORS = 'CLEAR_NOTE_ERRORS';


export const receiveNotes = (notes) => {
  return {
    type: RECEIVE_NOTES,
    notes
  };
};

const receiveNote = (noteWithNotebook) => {
  return {
    type: RECEIVE_NOTE,
    note: noteWithNotebook.note,
    notebook: noteWithNotebook.notebook
  };
};

const removeNote = (note) => {
  return {
    type: REMOVE_NOTE,
    noteId: note.id
  };
};

export const clearNotes = () => {
  return {
    type: CLEAR_NOTES,
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
    notes => {
      return dispatch(receiveNotes(notes));
    }
  );
};

export const fetchNote = (id) => dispatch => {
  return NoteAPIUtil.fetchNote(id).then(
    noteWithNotebook => {
      return dispatch(receiveNote(noteWithNotebook));
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
    err =>  dispatch(receiveErrors(err.responseJSON))
  );
};

export const deleteNote = (id) => dispatch => {
  return NoteAPIUtil.deleteNote(id).then(
    note =>  dispatch(removeNote(note))
  );
};
