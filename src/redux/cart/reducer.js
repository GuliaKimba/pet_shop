import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    productsInCart: [],
    totalPrice: 0,
    count: 1,
  },
  reducers: {
    // addProductToCart: (state, action) => {
    //  state.productsInCart.push(action.payload)
    // },
    addProductToCart: (state, action) => {
      const findProduct = state.productsInCart.find((item) => item._id === action.payload._id)
      if (findProduct) {
        findProduct.count += 1
      } else {
        state.productsInCart.push({
          ...action.payload,
          count: 1,
        })
      }
      state.totalPrice = state.productsInCart.reduce((sum, obj) => obj.price * obj.count + sum, 0)
    },

    // addProductToCart: (state, action) => {
    //  const findProduct = state.productsInCart.find((item) => item._id === action.payload._id)
    //  if (findProduct) {
    //    state.count += 1
    //  } else {
    //    state.productsInCart.push({
    //      ...action.payload,

    //    })
    //  }
    //  state.totalPrice = state.productsInCart.reduce((sum, obj) => obj.price * obj.count + sum, 0)
    // },
    deleteProductFromCart: (state, action) => {
      state.productsInCart = state.productsInCart.filter(
        (product) => product._id !== action.payload._id,
      )
    },
    deleteOneItem: (state, action) => {
      const findProduct = state.productsInCart.find((item) => item._id === action.payload)
      if (findProduct) {
        findProduct.count -= 1
      }
    },
  },
})

export const { addProductToCart, deleteProductFromCart, deleteOneItem } = cartSlice.actions
export default cartSlice.reducer
