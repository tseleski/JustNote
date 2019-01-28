import React from 'react';
import NoteIndexContainer from './notes/note_index_container';
import Side from './Side';
import { Link } from 'react-router-dom';

class Main extends React.Component {
  render(){
    return (
      <Side currentUser={this.props.currentUser} logout={this.props.logout} /> 
    )
  }
} 

export default Main;