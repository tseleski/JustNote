import React from 'react';
import TagFormItem from './tag_form_item';

class TagForm extends React.Component {
  constructor(props){
    super(props);
    const prevState = { name: '' }
    this.state = Object.assign(prevState, this.props.createTag);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.noteId != this.props.noteId) {
      this.props.clearTagErrors();
      this.setState({ name: ''});
    }
  }

  handleKeyPress(e){
    if(e.key === 'Enter'){
      const that = this;
      this.props.createTag({ name: this.state.name.trim().toLowerCase(), note_id: this.props.noteId }).then(
        () => that.setState({ name: '' })
      ).then(() => that.props.clearTagErrors());
      this.setState({ name: '' });
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
    const inputBox = this.props.tags.length > 0 ? (<input type="text"
      onKeyPress={this.handleKeyPress}
      onChange={this.update('name')}
      value={this.state.name} />) : (<input type="text" placeholder="Add Tag"
        onKeyPress={this.handleKeyPress}
        onChange={this.update('name')}
        value={this.state.name} />)
    return (
      <div className="tag-form">
        <div className="tag-input">
          <i className="fa fa-tag" aria-hidden="true"></i>
          <div className="tag-form-list-container">
            <div className="tag-form-list">
              {this.renderTags()}
            </div>
          </div>
          {inputBox}
        </div>
      </div>
    )
  }
}

export default TagForm;