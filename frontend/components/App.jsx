import React from 'react';
import GreetingContainer from '../components/greeting/greeting_container';
import LoginFormContainer from '../components/session_form/login_form_container';
import SignupFormContainer from '../components/session_form/signup_form_container';
import CreateNoteContainer from '../components/notes/create_note_container';
import EditNoteContainer from '../components/notes/edit_note_container';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <div className="all-content">
      <ProtectedRoute path="/" component={GreetingContainer} />
      <ProtectedRoute exact path="/notes/new" component={CreateNoteContainer} />
      <ProtectedRoute exact path="/notes/:noteId/edit" component={EditNoteContainer} />
    </div>
    <AuthRoute exact path="/" component={GreetingContainer} />
    <Switch>
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
    </Switch>

  </div>
);

export default App;