import { useState } from "react"
import { addHours } from 'date-fns'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { NavBar } from "../../themes"
import { getMessagesES, localizer } from "../../helpers"
import { CalendarEvent, CalendarModal } from "../../components"
import { useUiStore } from "../../hooks"



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


  const { openDateModal } = useUiStore()

  const [lastView, setLastView] = useState( localStorage.getItem( 'lastView') || 'week' )


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
const onDobleClick = ( event ) => {
  //console.log({doubleClick: event})
  openDateModal();
}

const onSelect = ( event ) => {
  console.log({onSelect:event});
}

const onViewChanged = ( event ) => {
  //console.log({ viewChanged: event });

  localStorage.setItem('lastView', event)
  setLastView(event)

}

  return (
    <div>
      <NavBar />
      <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc( 100vh - 80px )' }}
      messages={getMessagesES()}
      eventPropGetter={ eventStyleGetter }
      components={{
        event: CalendarEvent
      }}
      onDoubleClickEvent={onDobleClick}
      onSelectEvent={onSelect}
      onView={onViewChanged}
    />
    <CalendarModal />
    </div>
  )
}
