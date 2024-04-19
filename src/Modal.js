import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const { isModalOpen, closeModal, correct, questions } = useGlobalContext();

  return (
    <div className={`${isModalOpen ? 'modal-container isOpen' : 'modal-container'}`}>
      <div className="modal-content">
        <h2>congrats!</h2>
        <p>You answered of questions correctly</p>
        <button className="close-btn" onClick={closeModal}>
          play again
        </button>
      </div>
    </div>
  )
}

export default Modal
