import { addHours } from 'date-fns'
import { useCalendarStore, useUiStore } from '../hooks'
import './styles/calendarModal.css'


export const FabAddNew = () => {

    const { openDateModal } = useUiStore()
    const { setActiveEvent  } = useCalendarStore()

    const handleClickNew = ()=> {

        openDateModal();
        setActiveEvent({
            title: '',
            notes: '',
            allday: true,
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#347CF7',
            user: {
              _id: '3212321sdf321321sfda1',
              name: 'Joaquín'
            }
        })
    }

  return (
    <div>
        <button className="btn btn-primary fab" onClick={ handleClickNew }>
            <i className="fas fa-plus"></i>
        </button>
    </div>
  )
}
