import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import likesSlice from './likesSlice/likesSlice'
import { tokenReducer } from './slices/tokenSlice/tokenSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    token: tokenReducer,
    likes: likesSlice,
  },
})
