import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { format } from 'timeago.js';


class NoteIndexItem extends React.Component {
  constructor(props){
    super(props);
  }

  renderLink(filterType){
    switch (filterType) {
      case 'All':
        return `/notes/${ this.props.note.id }/edit`;
      case 'Notebook':
        return `/notebooks/${this.props.notebook.id}/notes/${this.props.note.id}/edit`;
      case 'Tag':
        return `/tags/${this.props.tag.id}/notes/${this.props.note.id}/edit`;
      case 'Search':
        if (this.props.match.params.tagId){
          return `/search/tags/${this.props.match.params.tagId}/notes/${this.props.note.id}/edit`;
        } else if (this.props.match.params.notebookId){
          return `/search/notebooks/${this.props.match.params.notebookId}/notes/${this.props.note.id}/edit`;
        } else {
          return `/search/all_notes/${this.props.note.id}/edit`;
        };
      default:
        break;
    }
  }

  render(){
    let noteTitle;
    let selected = "unselected";
    if (this.props.history.location.pathname.match(/\/notes\/([0-9]*)/)){
      selected = this.props.history.location.pathname.match(/\/notes\/([0-9]*)/)[1] == this.props.note.id ? "selected" : "unselected";
    }
    if (this.props.note.title === '' || this.props.note.title === 'Untitled'){
      noteTitle = 'Untitled';
    } else {
      noteTitle = this.props.note.title;
    }
    const limitedContent = (content) => {
      if (content.split('').length < 80) {
        return content;
      }
      return content.substring(0, 80) + "...";
    };
    const limitedTitle = (title) => {
      if (title.split('').length < 30) {
        return title;
      }
      return title.substring(0, 30) + "...";
    };
    return (
      <div className="single-note-container">
        <Link to={this.renderLink(this.props.filterType)}><div className={`single-note ${selected}`}>
          <div className="top">
            <p className="note-title">{limitedTitle(noteTitle)}</p>
            <p className="note-content">{limitedContent(this.props.note.plain_text)}</p>
          </div>
          <div className="timestamp">
            <p className="note-updated">{format(this.props.note.updated_at)}</p>
          </div>
        </div></Link>
      </div>
    )
  }
  
}

export default withRouter(NoteIndexItem);