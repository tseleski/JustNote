import React from 'react';
import { Link } from 'react-router-dom';
import NotebookIndexItem from './notebook_index_item';
import Side from '../Side';

class NotebookIndex extends React.Component {
  componentDidMount() {
    this.props.fetchNotebooks();
  }

  render() {
    const { notebooks } = this.props;
    const notebookList = notebooks.map(notebook => {
      return <NotebookIndexItem key={notebook.id} notebook={notebook} deleteNotebook={this.props.deleteNotebook} />
    });
    return (
      <div>
        <Link to={'/notebooks/new'}><button>Create a new notebook</button></Link>
        <ul>{notebookList}</ul>
      </div>
    )
  }
}

export default NotebookIndex;