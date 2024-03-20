import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'


import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from '../store/calendar/calendarSlice';
import { calendarApi } from '../api';
import { convertDateEvent } from '../helpers';


export const useCalendarStore = ()=> {

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent )=> {
        dispatch( onSetActiveEvent(calendarEvent) )
    }

    const startSavingEvent = async( calendarEvent )=> {

    try {
        if( calendarEvent.id ){
            await calendarApi.put(`/event/${calendarEvent.id}`, calendarEvent )
            dispatch( onUpdateEvent({ ...calendarEvent, user } ) )
            return;
        }
            const {data} = await calendarApi.post('/event', calendarEvent)
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.eventCreated.id, user } ) )

    } catch (error) {
        console.log(error);
        Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }

    }

    const startDeletingEvent = async(calendarEvent)=> {

        try {
            await calendarApi.delete(`/event/${activeEvent.id}` )
            dispatch( onDeleteEvent() )
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async()=> {
        try {
            const {data} = await calendarApi.get('/event')
            const events = convertDateEvent(data.events)
            dispatch(onLoadEvents(events))
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
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
        startLoadingEvents,
    }

}