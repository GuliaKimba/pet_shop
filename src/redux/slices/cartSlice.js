import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    productsInCart: JSON.parse(localStorage.getItem('cart')) || [],
    totalPrice: JSON.parse(localStorage.getItem('totalPrice')) || 0,
    // count: 1,
  },
  reducers: {
    // addProductToCart: (state, action) => {
    //  state.productsInCart.push(action.payload)
    // },
    addProductToCart: (state, action) => {
      const findProduct = state.productsInCart.find((item) => item._id === action.payload._id)
      console.log({ findProduct })
      if (findProduct) {
        findProduct.count += 1
      } else {
        state.productsInCart.push({
          ...action.payload,
          count: 1,
          checkbox: true,
        })
      }
      state.totalPrice = state.productsInCart.reduce(
        (sum, obj) => (obj.price - (obj.price * obj.discount) / 100) * obj.count + sum,
        0,
      )
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
      state.totalPrice = state.productsInCart
        .filter((product) => product._id !== action.payload._id)
        .reduce((sum, obj) => (obj.price - (obj.price * obj.discount) / 100) * obj.count + sum, 0)
    },
    deleteProductFromHeaderCart: (state, action) => {
      state.productsInCart = state.productsInCart.filter(
        (product) => product._id !== action.payload._id,
      )
      state.totalPrice = 0
    },
    deleteOneItem: (state, action) => {
      const findProduct = state.productsInCart.find((item) => item._id === action.payload)
      if (findProduct) {
        findProduct.count -= 1
      }
      const elemFind = state.productsInCart.find((el) => el._id === action.payload)
      const elemFindPrice = elemFind.price - (elemFind.price * elemFind.discount) / 100
      console.log({ elemFind })
      state.totalPrice = state.totalPrice - elemFindPrice
    },
    deleteCheckbox: (state, action) => {
      const findProduct = state.productsInCart.find((item) => item._id === action.payload._id)
      return findProduct.checkbox
    },
  },
})

export const {
  addProductToCart,
  deleteProductFromCart,
  deleteOneItem,
  deleteCheckbox,
  deleteProductFromHeaderCart,
} = cartSlice.actions
export default cartSlice.reducer
