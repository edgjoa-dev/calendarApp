import { NavBar } from "../../themes"
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { Calendar } from 'react-big-calendar'
import { getMessagesES, localizer } from "../../helpers"
import { CalendarEvent } from "../../components"



const events = [
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

export const CalendarPage = () => {

  const eventStyleGetter = ( event, start, end, isSelected  )=> {

  const style = {
     backgroundColor: '#347CF7',
     borderRadius: '0px',
     opacity: 0.8,
     color: 'white'
  }

  return {
    style
  }

  }

  return (
    <div>
      <NavBar />
      <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc( 100vh - 80px )' }}
      messages={getMessagesES()}
      eventPropGetter={ eventStyleGetter }
      components={{
        event: CalendarEvent
      }}
    />
    </div>
  )
}
