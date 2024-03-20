import { HashRouter } from 'react-router-dom'
import { Provider }  from 'react-redux'

import { AppRouter } from "./routes"
import { store } from './store'

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      {/* <BrowserRouter > */}
      <HashRouter>
        <AppRouter />
      </HashRouter>
      {/* </BrowserRouter> */}
    </Provider>
  )
}

