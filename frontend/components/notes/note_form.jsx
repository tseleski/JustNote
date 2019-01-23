import React from 'react';

class NoteForm extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.note;
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.props.action(this.state);
  }

  update(field){
    return e => this.setState({[field]: e.target.value});
  }

  render(){
    return (
      <div className="note-form">
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.title} onChange={this.update('title')} placeholder="Title"/>
          <textarea value={this.state.content} onChange={this.update('content')} placeholder="Start writing here..."cols="30" rows="10"></textarea>
          <input type="submit" value={this.props.formType}/>
        </form>
      </div>
    )
  }

}

export default NoteForm;