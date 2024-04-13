import { createSlice } from '@reduxjs/toolkit';

type AuthState = {

}

const initialState: AuthState = {

}

const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState: initialState,
  reducers: {

  }
})

export const authReducer = AuthSlice.reducer
export const { } = AuthSlice.actions