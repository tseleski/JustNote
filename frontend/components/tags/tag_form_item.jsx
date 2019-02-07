import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

class TagFormItem extends React.Component {
  constructor(props) {
    super(props);
    const prevState = { deletePopup: false };
    this.state = Object.assign(prevState, this.props);
    this.togglePopup = this.togglePopup.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  togglePopup(e) {
    e.stopPropagation();
    this.setState({ deletePopup: !this.state.deletePopup });
  }

  closePopup() {
    this.setState({ deletePopup: false });
  }

  handleRemove(e) {
    e.preventDefault();
    const that = this;
    this.props.removeTagging({ note_id: this.props.noteId, tag_id: this.props.tag.id}).then(
      () => {
        if (that.props.tag.id == that.props.match.params.tagId){
          that.props.history.push(`tags/${this.props.tag.id}`);
        }
      });
  }

  handleFilter(e) {
    e.preventDefault();
    this.props.history.push(`/tags/${this.props.tag.id}`);
  }

  render(){
    const popup = this.state.deletePopup ? "show" : "hide";
    return (
      <div className="tag-form-list-item" onClick={this.togglePopup} onBlur={this.closePopup} tabIndex="0">
        <div className={`tag-remove ${popup}`} >
          <div className="tag-remove-row" onClick={this.handleRemove}>
            <div>Remove</div>
          </div>
          <div className="filter-by-tag-row" onClick={this.handleFilter}>
            <div>Filter by Tag</div>
          </div>
        </div>
        <div className="tag-relative">
          <div className="tag-name">{this.props.tag.name}
            <div className="caret-container">
              <i className="fa fa-caret-down"></i>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(TagFormItem);