import React from 'react';
import TagFormItem from './tag_form_item';

class TagForm extends React.Component {
  constructor(props){
    super(props);
    const prevState = { name: '' }
    this.state = Object.assign(prevState, this.props.createTag);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e){
    if(e.key === 'Enter'){
      console.log(this.state.name);
      const that = this;
      this.props.createTag({ name: this.state.name.toLowerCase(), note_id: this.props.noteId }).then(
        () => that.setState({ name: '' })
      ).then(() => that.props.clearTagErrors());
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  renderErrors() {
    return (
      <ul className="errors tag-form-errors">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  renderTags(){
    const tagList = this.props.tags.map(tag => {
      return (
        <TagFormItem key={tag.id} tag={tag} 
        removeTagging={this.props.removeTagging} noteId={this.props.noteId} />
      )
    })
    return <>{tagList}</>
  }

  render(){
    return (
      <div className="tag-form">
        <div className="tag-form-list-container">
          <div className="tag-form-list">
            {this.renderTags()}
          </div>
        </div>
        {this.renderErrors()}
        <div className="tag-input">
          <i className="fa fa-tag" aria-hidden="true"></i>
          <input type="text" placeholder="Add Tag" 
          onKeyPress={this.handleKeyPress} 
          onChange={this.update('name')}
          value={this.state.name} />
        </div>
      </div>
    )
  }
}

export default TagForm;