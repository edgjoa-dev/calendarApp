import { NavBar } from "../../themes"
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours, format, parse, startOfWeek, getDay } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'


const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})


const events = [
  {
    title: 'All-day event',
    notes: 'This is a note',
    allday: true,
    start: new Date(),
    end: addHours(new Date(), 2),
  }
]

export const CalendarPage = () => {
  return (
    <div>
      <NavBar />
      <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc( 100vh - 80px )' }}
    />
    </div>
  )
}
