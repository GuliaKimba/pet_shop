import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const userID = JSON.parse(localStorage.getItem('userId'))

export const fetchLikes = createAsyncThunk('likes/fetch', async function () {
  const JWT = JSON.parse(localStorage.getItem('token'))
  const resp = await fetch('https://api.react-learning.ru/products', {
    headers: {
      authorization: `Bearer ${JWT}`,
    },
  })
  const data = await resp.json()
  return data
})

const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    usersLike: [],
  },
  reducers: {
    addAllUserLikes(state, action) {
      state.usersLike = action.payload
    },
    addLike: (state, action) => {
      const findProduct = state.usersLike.find((item) => item._id === action.payload)
      if (findProduct) {
        findProduct.count += 1
      } else {
        state.usersLike.push({
          ...action.payload,
          count: 1,
        })
      }
    },
    deleteLike: (state, action) => {
      state.usersLike = state.usersLike.filter((product) => product._id !== action.payload)
    },
  },

  extraReducers: {
    [fetchLikes.fulfilled]: (state, action) => {
      state.usersLike = action.payload.products.filter((el) => el.likes.includes(userID))
    },
  },
})

export const { addAllUserLikes, addLike, deleteLike } = likesSlice.actions
export default likesSlice.reducer
