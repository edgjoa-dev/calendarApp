import { createSlice } from '@reduxjs/toolkit'
// import { addHours } from 'date-fns'
// const eventBackend = [
//     {
//         _id: new Date().getTime(),
//         title: 'sdaffsds',
//         notes: 'Mi nota personal',
//         allday: true,
//         start: new Date(),
//         end: addHours(new Date(), 2),
//         bgColor: '#347CF7',
//         user: {
//           _id: '123',
//           name: 'Joaquín'
//         }
//       }
// ]


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [
            // ...eventBackend,
        ],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: ( state, { payload } )=> {
            state.activeEvent = payload;
        },
        onAddNewEvent: ( state, { payload } )=> {
            state.events.push( payload );
            state.activeEvent = null;
        },
        onUpdateEvent: ( state, { payload } )=> {
            state.events = state.events.map( event => {
                if( event.id === payload.id ){
                    return payload;
                }
                return event;
            })
            state.activeEvent = null;
        },
        onDeleteEvent: ( state )=> {
            if( state.activeEvent ){
                state.events = state.events.filter( event => event.id !== state.activeEvent.id );
                state.activeEvent = null;
            }
            return state;
        },
        onLoadEvents: ( state, { payload=[] } )=> {
            state.isLoadingEvents = false;
            payload.forEach( event => {
                const exist = state.events.some(  dbEvent => dbEvent.id === event.id);
                if( !exist ){
                    state.events.push( event );
                }
            } )
        },
        onLogoutCalendar: (state)=> {
            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = null;
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    onAddNewEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar,
    onSetActiveEvent,
    onUpdateEvent,

} = calendarSlice.actions
