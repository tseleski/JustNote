import React from 'react';

const notebookActions = (props) => {
  return (
    <div className="actions-list">
      <li>Rename Notebook</li>
      <li onClick={() => this.props.deleteNotebook()}>Delete Notebook</li>
    </div>
  )
}

export default notebookActions;