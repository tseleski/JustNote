import React from 'react';
import { Link } from 'react-router-dom';
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
        return `/search/notes/${this.props.note.id}/edit`;
      default:
        break;
    }
  }

  render(){
    const limitedContent = (content) => {
      if (content.split('').length < 80) {
        return content;
      }
      return content.substring(0, 80) + "...";
    };
    return (
      <Link to={this.renderLink(this.props.filterType)}><div className="single-note">
        <div className="top">
          <p className="note-title">{this.props.note.title}</p>
          <p className="note-content">{limitedContent(this.props.note.plain_text)}</p>
        </div>
        <div className="timestamp">
          <p className="note-updated">{format(this.props.note.updated_at)}</p>
        </div>
      </div></Link>
    )
  }
  
}

export default NoteIndexItem;