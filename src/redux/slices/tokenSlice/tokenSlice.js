import { createSlice } from '@reduxjs/toolkit'
// import { getInitialState } from '../../initialState'

const initialState = {
  token: '',
}
export const getInitialState = () => {
  const stateTokenLS = localStorage.getItem('token')
  return stateTokenLS ? JSON.parse(stateTokenLS) : initialState.token
}
const tokenSlice = createSlice({
  name: 'token',
  initialState: getInitialState(),
  reducers: {
    clearToken(state) {
      return localStorage.clear(state)
    },
  },
})

export const { clearToken } = tokenSlice.actions
export const tokenReducer = tokenSlice.reducer
