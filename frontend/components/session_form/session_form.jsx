import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearSessionErrors();
  }

  handleSubmit(e){
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  update(field){
    return e => this.setState({[field]: e.target.value});
  }

  renderLinks(){
    if (this.props.formType === 'Sign In'){
      return(
        <div className="bottom-section">
          <p className="question">Don't have an account?</p>
          <button className="link-title"><Link to={'/signup'}>Create account</Link></button>
        </div>
      )
    } else {
      return (
        <div className="bottom-section">
          <p className="question">Already have an account?</p>
          <button className="link-title"><Link to={'/login'}>Sign In</Link></button>
        </div>
      )
    }
  }

  renderErrors() {
    return(
      <ul className="errors">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  renderDemo(){
    if (this.props.formType === 'Sign In') {
      return (
        <div>
          <button className="demo" onClick={this.props.demoLogin}>Demo Login</button>
        </div>
      )
    }
  }

  render(){
    const links = this.renderLinks();
    return(
      <div className="session-page">
        <div className="session-form">
          <div className="top-section">
            <img src={window.logoURL} />
            <h2>JustNote</h2>
            <p className="subtitle">Remember everything important.</p>
          </div>
          {this.renderErrors()}
          <form onSubmit={this.handleSubmit}>
            <label>
                <input type="text" placeholder="Email" value={this.state.email} onChange={this.update('email')}/>
            </label>
            <label>
              <input type="password" placeholder="Password" value={this.state.password} onChange={this.update('password')} />
            </label>
        
            <input type="submit" value={this.props.formType} />
          </form>
          {this.renderDemo()}
          {links}
        </div>
      </div>
    )
  }

}

export default SessionForm;