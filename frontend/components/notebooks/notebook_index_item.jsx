import React from 'react';
import { Link } from 'react-router-dom';


const NotebookIndexItem = (props) => {

  return (
   <div>
      <p>{props.notebook.title}</p>
      <button onClick={() => props.deleteNotebook(props.notebook.id)}>Delete Notebook</button>
    </div>
  )
}

export default NotebookIndexItem;