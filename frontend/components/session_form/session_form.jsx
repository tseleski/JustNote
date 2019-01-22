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
    if (this.props.formType === 'Log In'){
      return(
        <>
          <p>Don't have an acconut?</p>
          <Link to={'/signup'}>Create account</Link>
        </>
      )
    } else {
      return (
        <>
          <p>Already have an acconut?</p>
          <Link to={'/login'}>Sign In</Link>
        </>
      )
    }
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render(){

    const formTitle = () => (<h2>{this.props.formType}</h2>)
    const links = this.renderLinks();
    const errorsList = this.props.errors;
    return(
      <>
        {formTitle}
        {this.renderErrors()}
        <form onSubmit={this.handleSubmit}>
          <label>Email:
              <input type="text" value={this.state.email} onChange={this.update('email')}/>
          </label>
          <label>Password:
             <input type="password" value={this.state.password} onChange={this.update('password')} />
          </label>
       
          <input type="submit" value={this.props.formType} />
        </form>
        {links}
      </>
    )
  }

}

export default SessionForm;