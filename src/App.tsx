import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import store from './libs/redux-store'
import i18next from './libs/i18n'
import AppRouter from './Router'

function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <I18nextProvider i18n={i18next}>
          <AppRouter />
        </I18nextProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App
