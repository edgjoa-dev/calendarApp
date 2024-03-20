import { useEffect, useState } from "react"
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { NavBar } from "../../themes"
import { getMessagesES, localizer } from "../../helpers"
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../../components"
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks"


export const CalendarPage = () => {
  const { user } = useAuthStore()
  const { openDateModal } = useUiStore()
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')


  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);


      const style = {
        display:  isMyEvent ? 'block' : 'none',
        backgroundColor:'#347CF7',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white'
      }
      return {
        style
      }




  }
  const onDobleClick = (event) => {
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event)
  }

  const onViewChanged = (event) => {

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
