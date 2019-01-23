import React from 'react';
import GreetingContainer from '../components/greeting/greeting_container';
import LoginFormContainer from '../components/session_form/login_form_container';
import SignupFormContainer from '../components/session_form/signup_form_container';
import CreateNoteContainer from '../components/notes/create_note_container';
import EditNoteContainer from '../components/notes/edit_note_container';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';

const App = () => (
  <div>
      <Route path="/" component={GreetingContainer} />
      <Route exact path="/notes/new" component={CreateNoteContainer} />
      <Route exact path="/notes/:noteId/edit" component={EditNoteContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
  </div>
);

export default App;