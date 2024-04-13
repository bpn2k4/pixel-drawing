import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from '../slices/Auth'

const reducer = {
  auth: authReducer
}

const store = configureStore({
  reducer: reducer
})

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch