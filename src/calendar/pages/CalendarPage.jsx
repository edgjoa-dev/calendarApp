import { useEffect, useState } from "react"
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { NavBar } from "../../themes"
import { getMessagesES, localizer } from "../../helpers"
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../../components"
import { useCalendarStore, useUiStore } from "../../hooks"


export const CalendarPage = () => {
  const { openDateModal } = useUiStore()
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')


  const eventStyleGetter = (event, start, end, isSelected) => {

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
  const onDobleClick = (event) => {
    //console.log({doubleClick: event})
    openDateModal();
  }

  const onSelect = (event) => {
    //console.log({onSelect:event});
    setActiveEvent(event)
  }

  const onViewChanged = (event) => {
    //console.log({ viewChanged: event });

    localStorage.setItem('lastView', event)
    setLastView(event)

  }

  useEffect(()=> {
    startLoadingEvents();
  }, [])

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
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDobleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />

    </div>
  )
}
