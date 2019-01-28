import React from 'react';
import GreetingContainer from '../components/greeting/greeting_container';
import Side from './Side';
import NoteIndexContainer from '../components/notes/note_index_container';
import LoginFormContainer from '../components/session_form/login_form_container';
import SignupFormContainer from '../components/session_form/signup_form_container';
import CreateNoteContainer from '../components/notes/create_note_container';
import EditNoteContainer from '../components/notes/edit_note_container';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import NotebookIndexContainer from './notebooks/notebook_index_container';

const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
    </Switch>
    <div className="all-content">
      <div className="main-content">
        <div className="columns">
          <ProtectedRoute path="/" component={GreetingContainer} />
          <ProtectedRoute path="/notes" component={NoteIndexContainer} />
          <ProtectedRoute exact path="/notes/new" component={CreateNoteContainer} />
          <ProtectedRoute exact path="/notes/:noteId/edit" component={EditNoteContainer} />
          <ProtectedRoute exact path="/notebooks" component={NotebookIndexContainer} />
        </div>
      </div>
    </div>
    <AuthRoute exact path="/" component={GreetingContainer} />
    

  </div>
);

export default App;