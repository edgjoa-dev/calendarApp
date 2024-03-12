import { useSelector, useDispatch } from 'react-redux'
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';


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
            dispatch( onUpdateEvent({ ...calendarEvent } ) )
        }else{
            //*creando evento
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() } ) )
        }
    }

    const startDeletingEvent = async()=> {
        dispatch( onDeleteEvent() )
    }

    return {
        //*Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //*Métodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }

}