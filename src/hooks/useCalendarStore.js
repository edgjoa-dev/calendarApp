import { useSelector, useDispatch } from 'react-redux'
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
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
        //TODO:Ir a backend


        //*si pasa
        if( calendarEvent._id ){
            //*actualizar evento si existe un_id
            dispatch( onUpdateEvent({ ...calendarEvent } ) )
        }else{
            //*creando evento
            const {data} = await calendarApi.post('/event', calendarEvent)
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.eventCreated.id, user } ) )
        }
    }

    const startDeletingEvent = async()=> {
        dispatch( onDeleteEvent() )
    }


    const startLoadingEvents = async()=> {
        try {
            const {data} = await calendarApi.get('/event')
            const events = convertDateEvent(data.events)
            console.log(events);

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