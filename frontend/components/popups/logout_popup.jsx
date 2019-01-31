import React from 'react';

class LogoutPopup extends React.Component {
  constructor(props){
    super(props);
    this.state = { popup: true };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.setState({ popup: true });
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick(e) {
    if (this.node.contains(e.target)) {
      this.setState({ popup: true });
      return;
    }
    this.handleClickOutside();
  }

  handleClickOutside(){
    this.setState({ popup: false });
  }

  render(){
    const popup = this.state.popup ? "show" : "hide";
    return (
      <div ref={node => this.node = node}>
        <div className={`logout-popup ${popup}`}>
          <div className="logout-popup-items">
            <p>Account</p>
            <h3 className="account-email">{this.props.currentUser.email}</h3>
            <button onClick={this.props.logout} className="logout-btn">Sign out {this.props.currentUser.email}</button>
          </div>
        </div>
      </div>
    )
  }

}

export default LogoutPopup;