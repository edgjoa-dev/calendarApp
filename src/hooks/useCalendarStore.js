import { useSelector, useDispatch } from 'react-redux'
import { onAddNewEvent, onSetActiveEvent } from '../store/calendar/calendarSlice';


export const useCalendarStore = ()=> {

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent )=> {
        dispatch( onSetActiveEvent(calendarEvent) )
    }

    const startSavingEvent = async( calendarEvent )=> {
        //TODO:Ir a backend
        //*si pasa
        if( calendarEvent._id ){
            //*actualizar evento si existe un_id
        }else{
            //*creando evento
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() } ) )
        }
    }

    return {
        //*Propiedades
        events,
        activeEvent,

        //*Métodos
        setActiveEvent,
        startSavingEvent,
    }

}