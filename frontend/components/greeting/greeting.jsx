import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {
  if (currentUser) {
    return (
      <div className="side-nav">
        <button onClick={logout}>Logout</button>
      </div>
    )
  } else {
    return (
      <section className="splash-page">
        <div className="navbar">
          <h2><Link to={'/'}>JustNote</Link></h2>
          <button><Link to={'/signup'}>Sign Up</Link></button> or <button><Link to={'/login'}>Log In</Link></button>
        </div>
        <div className="content">
          <h2>Feel organized without the effort</h2>
          <p>JustNote helps you capture and prioritize ideas, projects, and to-do lists, so nothing falls through the cracks.</p>
          <img src="" alt=""/>
          <button><Link to={'/signup'}>SIGN UP FOR FREE</Link></button>
        </div>
      </section>
    )
  }
};

export default Greeting;