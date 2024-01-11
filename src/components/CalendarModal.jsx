import { useState } from "react";
import Modal from "react-modal";
import './styles/calendarModal.css'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');

  export const CalendarModal = () => {

    const [isOpen, setisOpen] = useState(true)

    const onCloseModal = ()=> {
      console.log('cerrando modal...');
      setisOpen(false);

    }

    return (
    <Modal
    className="modal"
    overlayClassName="modal-fondo"
    closeTimeoutMS={200}
    isOpen={isOpen}
    onRequestClose={onCloseModal}
    style={customStyles}
    contentLabel="Example Modal"
  >
    <div>I am a modal</div>
  </Modal>
  )
}
