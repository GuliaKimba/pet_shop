import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const JWT = JSON.parse(localStorage.getItem('token'))

export const fetchRev = createAsyncThunk('rev/fetchrev', async function () {
  const resp = await fetch('https://api.react-learning.ru/products/review/', {
    headers: {
      authorization: `Bearer ${JWT}`,
    },
  })
  const data = await resp.json()
  return data
})

const revSlice = createSlice({
  name: 'reviews',
  initialState: {
    rev: [],
  },
  reducers: {
    addRev: (state, action) => {
      state.rev.push({
        ...action.payload,
      })
    },
    deleteRev: (state, action) => {
      state.rev = state.rev.filter((product) => product._id !== action.payload._id)
    },
  },

  extraReducers: {
    [fetchRev.fulfilled]: (state, action) => {
      state.rev = action.payload
    },
  },
})

export const { addRev, deleteRev } = revSlice.actions
export default revSlice.reducer
