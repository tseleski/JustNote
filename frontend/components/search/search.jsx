import React from 'react';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: this.props.query };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.renderPushLink = this.renderPushLink.bind(this);
  }

  update() {
    return (e) => {
      this.props.receiveQuery(e.target.value);
      this.setState({ 'query': e.target.value }, debounce(() => {
        this.handleKeyPress();
      }, 1000));
    };
  }

  handleKeyPress() {
    if (this.state.query.length === 0) {
      if(this.props.notebookId){
        this.props.history.push(`/notebooks/${this.props.notebookId}`);
      } else if (this.props.tagId){
        this.props.history.push(`/tags/${this.props.tagId}`);
      } else {
        this.props.history.push("/notes");
      }
    }
    if (this.state.query.length > 0) {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    this.props.search({query: this.state.query.toLowerCase(), notebook_id: this.props.notebookId, tag_id: this.props.tagId}).then(() => {
      this.props.history.push(this.renderPushLink());
    });
  }

  renderPushLink(){
    if(this.props.notebookId){
      return `/search/notebooks/${this.props.notebookId}`;
    } else if (this.props.tagId) {
      return `/search/tags/${this.props.tagId}`;
    } else {
      return "/search/all_notes";
    }
  }

  render(){
    const searching = this.props.query.length > 0 ? "searching" : "";
    return (
      <div className="search-container">
        <input className="search-bar" tabIndex="0" type="text" placeholder="Search notes..." 
        value={this.props.query} onChange={this.update('query')} />
        <i className={`fa fa-search ${searching}`}></i>
      </div>
    )
  }

}

export default (Search);