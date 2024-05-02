// Modal.js
import Modal from 'react-modal';
import "./Modal.css";
import { CustomModalProps } from '../../typings/signup/modalPropType';

Modal.setAppElement("body");

export function CustomModal(CustomModalProps:CustomModalProps){
  return (
    <Modal
      isOpen={CustomModalProps.isOpen}
      onRequestClose={CustomModalProps.onRequestClose}
      contentLabel="Example Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div>{CustomModalProps.children}</div>
    </Modal>
  );
}

