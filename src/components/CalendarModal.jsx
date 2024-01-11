import { useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";


import Modal from "react-modal";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2'

import 'sweetalert2/src/sweetalert2.scss'
import './styles/calendarModal.css'


registerLocale('es', es)

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
  const [formValues, setFormValues] = useState({
    title: 'Edgar',
    notes: 'Esta es mi primera nota!!!',
    allday: true,
    start: new Date(),
    end: addHours(new Date(), 2),
  })

  const onInputChanged = ({ target })=> {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChanged = ( event, changing )=> {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onCloseModal = () => {
    console.log('cerrando modal...');
    setisOpen(false);

  }

  const onSubmit = (event) => {
    event.preventDefault();

    //validar la diferencia entre hora de inicio y de termino de evento
    const difference = differenceInSeconds( formValues.end, formValues.start );

    if( isNaN( difference ) || difference <= 0  ){
      //console.log('Error de fechas');
      Swal.fire({
        title: 'Error!',
        text: 'Fechas incorrectas, porfavor válide las fechas nuevamente',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
      return;
    }

    if( formValues.title.length <= 0 ){
      //console.log('Error de titulo');
      Swal.fire({
        title: 'Error!',
        text: 'Error en el titulo, porfavor válide el titulo de evento nuevemente',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
      return;
    }

    if( formValues.notes.trim().length <= 0 ){
      //console.log('Error de notas');
      Swal.fire({
        title: 'Error!',
        text: 'Error en nota, porfavro válide la nota nuevamente',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
      return;
    }

    console.log({formValues});


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
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit} >

        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <div className="datepicker-input_start">
            <DatePicker
              locale={es}
              selected={formValues.start}
              onChange={(event) => onDateChanged(event, 'start')}
              dateFormat="Pp"
              className="form-control"
              showTimeSelect
              timeCaption="Hora"
            />
          </div>
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <div className="datepicker-input_end">
            <DatePicker
              locale={es}
              minDate={ formValues.start }
              selected={formValues.end}
              onChange={(event) => onDateChanged(event, 'end')}
              dateFormat="Pp"
              className="form-control"
              showTimeSelect
              timeCaption="Hora"
            />
          </div>
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={ onInputChanged }
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={ onInputChanged }
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}
