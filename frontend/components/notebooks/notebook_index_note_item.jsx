import React from 'react';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

class NotebookIndexNoteItem extends React.Component {
  render() {
    debugger
    return (
      <div className="notebook-index-item">
        <div className="each-note">
          <div className="each-note-title">
            <Link to={`/notebooks/${this.props.notebookId}/notes/${this.props.note.id}/edit`}><i className="fa fa-sticky-note"></i>{this.props.note.title}</Link>
          </div>
          <div className="each-note-updated"> {format(this.props.note.updated_at)}</div>
          <div className="each-note-actions"></div>
        </div>
      </div>
    )
  }

}

export default NotebookIndexNoteItem;