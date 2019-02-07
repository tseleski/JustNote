import React from 'react';
import { withRouter } from 'react-router-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  update(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && this.state.query.length > 0) {
      this.handleSubmit(e);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.search(this.state.query.toLowerCase()).then(() => {
      this.props.history.push("/search");
    });
  }

  render(){
    return (
      <div className="search-container">
        <input className="search-bar" type="text" placeholder="Search all notes..." 
        value={this.state.query} onChange={this.update('query')}
        onKeyPress={this.handleKeyPress} />
        <i className="fa fa-search"></i>
      </div>
    )
  }

}

export default withRouter(Search);