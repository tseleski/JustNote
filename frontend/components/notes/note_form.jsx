import React from 'react';
import { withRouter } from 'react-router-dom';

class NoteForm extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.note;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    if(this.props.formType === 'Edit'){
      this.props.fetchNote(this.props.id).then(({ note }) => {
        this.setState({ id: note.id, title: note.title, content: note.content});
      });
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.note.id != this.props.id) {
      this.props.fetchNote(this.props.id).then(({ note }) => {
        this.setState({ id: note.id, title: note.title, content: note.content });
      });
    }
  }

  handleSubmit(e){
    e.preventDefault();
    if (this.props.formType === 'Create'){
      this.props.action(this.state).then(this.props.history.push(`/`));
    } else {
      this.props.action(this.state);
    }
  }

  update(field){
    return e => this.setState({[field]: e.target.value});
  }

  handleDelete(e){
    e.preventDefault();
    const that = this;
    this.props.deleteNote(this.props.id).then(() =>
      that.props.history.push('/')
    );
  }

  renderDelete(){
    if (this.props.formType === 'Edit'){
      return (
        <p onClick={this.handleDelete} className="delete-note">Delete this note</p>
      )
    }
  }

  render(){
    return (
      <div className="note-form">
        <form onSubmit={this.handleSubmit}>
          <input className="title-input" type="text" value={this.state.title} onChange={this.update('title')} placeholder="Title"/>
          <textarea className="content-input" value={this.state.content} onChange={this.update('content')} placeholder="Start writing here..."cols="30" rows="30"></textarea>
          <input type="submit" value={this.props.formType}/>
        </form>
        {this.renderDelete()}
      </div>
    )
  }

}

export default withRouter(NoteForm);