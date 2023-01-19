import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import { tokenReducer } from './slices/tokenSlice/tokenSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    token: tokenReducer,
  },
})
