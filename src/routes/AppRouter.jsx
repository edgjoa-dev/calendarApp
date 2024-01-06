import { Routes, Route, Navigate }  from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage'
import { CalendarPage } from '../calendar/pages/CalendarPage'


export const AppRouter = () => {

  const authSlice = "authenticated" //"not-authenticated"

  return (
    <Routes>
      {
        ( authSlice === "not-authenticated" )
        ? <Route path='/auth/*' element={ <LoginPage  /> } />
        : <Route path='/*' element={ <CalendarPage  /> } />
      }

      <Route path='/*' element={ <Navigate to="/auth/login" /> } />
    </Routes>
  )
}
