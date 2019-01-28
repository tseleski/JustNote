import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import NotebookActions from '../notebooks/single_notebook_actions';
import { deleteNotebook } from '../../actions/notebook_actions';


function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }

  let component;
  switch (modal) {
    case 'notebook_actions':
      component = <NotebookActions closeModal={closeModal} deleteNotebook={deleteNotebook} />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);