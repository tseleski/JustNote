import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props){
    super(props);
    const prevState = { revealedPassword: false };
    this.state = Object.assign(prevState, { email: '', password: '' });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.revealPassword = this.revealPassword.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
    // this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  componentDidMount(){
    this.setState({ revealedPassword: false });
  }

  componentWillUnmount() {
    this.props.clearSessionErrors();
  }

  handleSubmit(e){
    e.preventDefault();
    if (this.props.formType === "Sign In"){
      if (this.state.revealedPassword === false){
        this.revealPassword(this.state);
      } else {
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
      }
    } else {
      const user = Object.assign({}, this.state);
      this.props.processForm(user);
    }
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
        <button className="demo" onClick={this.handleDemoLogin}>Demo Login</button>
      )
    }
  }

  handleDemoLogin(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.demoLogin();
  }

  renderForm(){
    if (this.props.formType === 'Sign Up') {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" placeholder="Email" value={this.state.email} onChange={this.update('email')} />
          </label>
          <label>
            <input className="sign-up-password" type="password" placeholder="Password" value={this.state.password} onChange={this.update('password')} />
          </label>

          <input type="submit" value={this.props.formType} />
        </form>
      )
    } else {
      const passwordReveal = this.state.revealedPassword ? "show" : "hide";
      const text = this.state.revealedPassword ? "Sign In" : "Continue";
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" placeholder="Email address" value={this.state.email} onChange={this.update('email')} />
          </label>
    
            <input  className={`password-input ${passwordReveal}`} type="password" placeholder="Password" value={this.state.password} onChange={this.update('password')} />

          <input type="submit" value={text} />
          {this.renderDemo()}
        </form>
      )
    }
  }
  
  revealPassword(user){
    this.props.checkEmail(user).then(() => this.setState({ revealedPassword: true })).then(() => this.props.clearSessionErrors());
  }

  render(){
    const links = this.renderLinks();
    const passwordReveal = this.state.revealedPassword ? "expand" : "";
    return(
      <div className="session-page">
        <div className={`session-form ${passwordReveal}`}>
          <div className="top-section">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="188" height="100" viewBox="0 0 188 100">
              <g fill="none">
                <path d="M14.6533 12.2376C14.6533 12.7795 14.608 13.6826 14.0653 14.2697C13.4774 14.8116 12.5729 14.8567 12.0302 14.8567H6.24121C4.56784 14.8567 3.57287 14.8567 2.89448 14.947C2.53267 14.9922 2.08041 15.1728 1.85428 15.2631C1.76382 15.3083 1.76382 15.2631 1.80905 15.218L15.0151 1.80629C15.0603 1.76113 15.1055 1.76113 15.0603 1.85145C14.9698 2.07723 14.7889 2.5288 14.7437 2.89006C14.6533 3.56742 14.6533 4.56088 14.6533 6.23169V12.2376ZM26.9095 52.7888C25.3719 51.7953 24.5578 50.4857 24.2412 49.6729C23.9246 48.9052 23.7437 48.0473 23.7437 47.1893C23.7437 43.4412 26.8191 40.3705 30.6181 40.3705C31.7487 40.3705 32.6533 41.2737 32.6533 42.4026C32.6533 43.1703 32.2462 43.8025 31.6131 44.1637C31.3869 44.2992 31.0704 44.3895 30.8442 44.4347C30.6181 44.4798 29.7588 44.5702 29.3518 44.9314C28.8995 45.2927 28.5377 45.8797 28.5377 46.5119C28.5377 47.1893 28.809 47.8215 29.2613 48.273C30.0754 49.0859 31.1608 49.5374 32.3367 49.5374C35.4121 49.5374 37.8995 47.0538 37.8995 43.9831C37.8995 41.2285 36.0452 38.79 33.603 37.7063C33.2412 37.5256 32.6533 37.3902 32.1106 37.2547C31.4322 37.1192 30.799 37.0289 30.7538 37.0289C28.8543 36.8031 24.1055 35.3129 23.7889 31.1133C23.7889 31.1133 22.3869 37.4353 19.5829 39.1513C19.3116 39.2868 18.9498 39.4222 18.5427 39.5125C18.1357 39.6029 17.6834 39.648 17.5477 39.648C12.9799 39.919 8.14071 38.4739 4.79398 35.042C4.79398 35.042 2.53267 33.1905 1.35679 27.9975C1.08543 26.7331 0.542713 24.4752 0.22613 22.3528C0.090452 21.5851 0.0452259 20.9981 0 20.4562C0 18.2435 1.35679 16.7533 3.07538 16.5275C3.1206 16.5275 3.25628 16.5275 3.34674 16.5275C4.38694 16.5275 12.3015 16.5275 12.3015 16.5275C13.8844 16.5275 14.7889 16.1211 15.3769 15.5792C16.1457 14.8567 16.3266 13.8181 16.3266 12.5989C16.3266 12.5989 16.3266 4.38025 16.3266 3.34163C16.3266 3.29648 16.3266 3.11585 16.3266 3.07069C16.5528 1.39987 18.0452 0 20.2613 0C20.2613 0 20.9397 0 21.3467 0C21.799 0 22.3417 0.0451572 22.8392 0.0903144C23.201 0.135472 23.5176 0.225786 24.0603 0.361258C26.8191 1.03862 27.407 3.83836 27.407 3.83836C27.407 3.83836 32.608 4.74151 35.2312 5.19308C37.7186 5.64465 43.8693 6.05106 45.0452 12.2376C47.804 26.9588 46.1307 41.2285 45.995 41.2285C44.0503 55.1369 32.4724 54.4596 32.4724 54.4596C30.0302 54.5047 28.1759 53.6468 26.9095 52.7888ZM37.3116 23.2108C35.8191 23.0753 34.5528 23.6624 34.1005 24.7913C34.0101 25.0171 33.9196 25.288 33.9648 25.4235C34.01 25.559 34.1005 25.6041 34.191 25.6493C34.7337 25.9202 35.6382 26.0557 36.9498 26.1912C38.2613 26.3266 39.1658 26.417 39.7538 26.3266C39.8442 26.3266 39.9347 26.2815 40.0251 26.146C40.1156 26.0105 40.0704 25.7396 40.0704 25.5138C39.9347 24.2946 38.804 23.3914 37.3116 23.2108Z"
                  transform="translate(66.6831 0.120117)"
                  fill="#00A82D"></path>
              </g>
            </svg>
            <h2>JustNote</h2>
            <p className="subtitle">Remember everything important.</p>
          </div>
          {this.renderErrors()}
          {this.renderForm()}
          {links}
        </div>
      </div>
    )
  }

}

export default SessionForm;