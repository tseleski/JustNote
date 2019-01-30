import React from 'react';

class TagFormItem extends React.Component {
  constructor(props) {
    super(props);
    const prevState = { deletePopup: false };
    this.state = Object.assign(prevState, this.props);
    this.togglePopup = this.togglePopup.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  togglePopup(e) {
    e.stopPropagation();
    this.setState({ deletePopup: !this.state.deletePopup });
  }

  handleRemove(e) {
    e.preventDefault();
    this.props.removeTagging({ note_id: this.props.noteId, tag_id: this.props.tag.id})
  }

  render(){
    const popup = this.state.deletePopup ? "show" : "hide";
    return (
      <div className="tag-form-list-item">
        <div className="tag-name">{this.props.tag.name}
          <div className="caret-container"><i className="fa fa-caret-down" onClick={this.togglePopup}></i></div>
        </div>
        <div className={`tag-remove ${popup}`} >
          <div className="tag-remove-row" onClick={this.handleRemove}>
            <div>Remove tag</div>
          </div>
        </div>
      </div>
    )
  }

}

export default TagFormItem;