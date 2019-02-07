import * as NoteAPIUtil from '../util/note_api_util';
export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const RECEIVE_NOTE = 'RECEIVE_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const CLEAR_NOTES = 'CLEAR_NOTES';
export const RECEIVE_NOTE_ERRORS = 'RECEIVE_NOTE_ERRORS';
export const CLEAR_NOTE_ERRORS = 'CLEAR_NOTE_ERRORS';
export const START_LOADING_ALL_NOTES = 'START_LOADING_ALL_NOTES';
export const START_LOADING_NOTE = 'START_LOADING_NOTE';


export const receiveNotes = (notes) => {
  return {
    type: RECEIVE_NOTES,
    notes
  };
};

export const receiveNote = (noteWithNotebookAndTags) => {
  return {
    type: RECEIVE_NOTE,
    note: noteWithNotebookAndTags.note,
    notebook: noteWithNotebookAndTags.notebook,
    tags: noteWithNotebookAndTags.tags
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

export const startLoadingAllNotes = () => ({
  type: START_LOADING_ALL_NOTES
});

export const startLoadingNote = () => ({
  type: START_LOADING_NOTE
});

export const fetchNotes = () => dispatch => {
  return NoteAPIUtil.fetchNotes().then(
    notes => {
      return dispatch(receiveNotes(notes));
    }
  );
};

export const fetchNote = (id) => dispatch => {
  return NoteAPIUtil.fetchNote(id).then(
    noteWithNotebookAndTags => {
      return dispatch(receiveNote(noteWithNotebookAndTags));
    }
  );
};

export const createNote = (note) => dispatch => {
  return NoteAPIUtil.createNote(note).then(
    noteWithNotebookAndTags => dispatch(receiveNote(noteWithNotebookAndTags)),
    err => dispatch(receiveErrors(err.responseJSON))
  );
};

export const updateNote = (note) => dispatch => {
  return NoteAPIUtil.updateNote(note).then(
    noteWithNotebookAndTags => dispatch(receiveNote(noteWithNotebookAndTags)),
    err =>  dispatch(receiveErrors(err.responseJSON))
  );
};

export const deleteNote = (id) => dispatch => {
  return NoteAPIUtil.deleteNote(id).then(
    note =>  dispatch(removeNote(note))
  );
};

export const searchNotes = (query) => dispatch => {
  return NoteAPIUtil.searchNotes(query).then(
    notes => dispatch(receiveNotes(notes))
  );
};
