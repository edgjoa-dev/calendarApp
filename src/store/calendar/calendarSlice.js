import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

const eventBackend = [
    {
        _id: new Date().getTime(),
        title: 'sdaffsds',
        notes: 'Mi nota personal',
        allday: true,
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: '#347CF7',
        user: {
          _id: '123',
          name: 'Joaquín'
        }
      }
]


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            ...eventBackend,
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
        }
    },
})

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent } = calendarSlice.actions
