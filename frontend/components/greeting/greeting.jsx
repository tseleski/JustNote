import React from 'react';
import { Link } from 'react-router-dom';
import NoteIndexContainer from '../notes/note_index_container';
import { ProtectedRoute } from '../../util/route_util';
import CreateNoteContainer from '../notes/create_note_container';
import EditNoteContainer from '../notes/edit_note_container';
import Main from '../Main';

const Greeting = ({ currentUser, logout }) => {
  if (currentUser) {
    return (
      <Main currentUser={currentUser} logout={logout}/>
    )
  } else {
    return (
      <section className="splash-page">
        <div className="navbar">
          <div className="logo">
            <Link to={'/'}><img className="logo-image" src={window.logoURL} /></Link>
            <h2><Link to={'/'}>JustNote</Link></h2>
          </div> 
          <ul className="buttons">
            <li className="signup"><Link to={'/signup'}>Sign up</Link></li> 
            <li>or</li>
            <li className="login"><Link to={'/login'}>Log in</Link></li>
          </ul>
        </div>
        <div className="content">
          <div className="content-left">
            <h2>Feel organized without the effort</h2>
            <p>JustNote helps you capture and prioritize ideas, projects, and to-do lists, so nothing falls through the cracks.</p>
            <button><Link to={'/signup'}>SIGN UP FOR FREE</Link></button>
          </div>
          <div className="content-right">
            <img src={window.compURL} />
          </div>
        </div>
        <div className="content2">
          <img className="focus-img" src={window.focusURL} />
          <h2 className="focus">Focus on what matters most</h2>
        </div>

        <footer className="footer">
          <ul className="footer-links">
            <li><a href='https://github.com/tseleski'>Github</a></li>
            <li><a href='https://linkedin.com/in/tamar-seleski-bb0a4192/'>LinkedIn</a></li>
          </ul>

        </footer>
      </section>
    )
  }
};

export default Greeting;