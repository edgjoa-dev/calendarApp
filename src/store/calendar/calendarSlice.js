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
        }
    },
})

// Action creators are generated for each case reducer function
export const { onSetActiveEvent } = calendarSlice.actions
