import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

const eventBackend = [
    {
        title: 'Cumpleaños',
        notes: 'Esta es mi primera nota',
        allday: true,
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: '#347CF7',
        user: {
          _id: '123',
          name: 'Juan'
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
        increment: (state) => {
            state.value += 1
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment } = calendarSlice.actions
