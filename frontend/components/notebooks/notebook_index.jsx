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
      <div className="notebook-panel">
        <div className="column-header">
          Notebooks
        </div>
        <div className="table-header">
          <span className="header-title">My notebook list</span>
          <div className="new-notebook">
            {/* <svg xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24">
              <defs>
                <path id="113a" d="M19 17v-2h2v2h2v2h-2v2h-2v-2h-2v-2h2zm-1-2.874a4.002 4.002 0 0 0-2.952 4.497H9V4h7c1.105 0 2 .873 2 1.95v8.176zM6 4h2v14.623H6V4zm9.5 4h-4c-.276 0-.5.15-.5.333v1.334c0 .184.224.333.5.333h4c.276 0 .5-.15.5-.333V8.333C16 8.15 15.776 8 15.5 8z" ></path>
              </defs>
              <use fill="#fff" fill-rule="nonzero">
                <path id="113a" d="M19 17v-2h2v2h2v2h-2v2h-2v-2h-2v-2h2zm-1-2.874a4.002 4.002 0 0 0-2.952 4.497H9V4h7c1.105 0 2 .873 2 1.95v8.176zM6 4h2v14.623H6V4zm9.5 4h-4c-.276 0-.5.15-.5.333v1.334c0 .184.224.333.5.333h4c.276 0 .5-.15.5-.333V8.333C16 8.15 15.776 8 15.5 8z"></path>
              </use>
            </svg> */}
          New Notebook
          </div>
        </div>
        <div className="notebook-table">
          <div className="column-headers">
            <div className="title-col">Title</div>
            <div className="updated-col">Updated</div>
            <div className="actions-col">Actions</div>
          </div>
          <ul>{notebookList}</ul>
        </div>
      </div>
    )
  }
}

export default NotebookIndex;