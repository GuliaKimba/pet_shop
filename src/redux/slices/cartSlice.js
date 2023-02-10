import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    productsInCart: JSON.parse(localStorage.getItem('cart')) || [],
    totalPrice: JSON.parse(localStorage.getItem('totalPrice')) || 0,
    checkAll: true,
  },
  reducers: {
    addProductToCart: (state, action) => {
      const findProduct = state.productsInCart.find((item) => item._id === action.payload._id)

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

      state.totalPrice = state.totalPrice - elemFindPrice
    },
    addCheckbox: (state, action) => {
      const findProduct = state.productsInCart.find((item) => item._id === action.payload)
      if (findProduct) {
        findProduct.checkbox = !findProduct.checkbox
      }
      const findTru = state.productsInCart.filter((el) => el.checkbox === true)

      if (findTru.length < 1) {
        state.checkAll = false
      }
      if (findTru.length > 0) {
        state.checkAll = true
      }
    },

    toggleAllCheckbox(state) {
      state.checkAll = false
      state.productsInCart = state.productsInCart.map((product) => ({
        ...product,
        checkbox: false,
      }))
    },

    noToggleAllCheckbox(state) {
      state.checkAll = true
      state.productsInCart = state.productsInCart.map((product) => ({
        ...product,
        checkbox: true,
      }))
    },

    changeCheckbox(state) {
      state.productsInCart = state.productsInCart.map((product) => ({
        ...product,
        checkbox: !product.checkbox,
      }))
    },

    deleteSelectCheck: (state, action) => {
      state.productsInCart = state.productsInCart.filter((product) => product.checkbox === false)

      state.totalPrice = state.productsInCart
        .filter((product) => product._id !== action.payload._id)
        .reduce((sum, obj) => (obj.price - (obj.price * obj.discount) / 100) * obj.count + sum, 0)
    },
  },
})

export const {
  addProductToCart,
  deleteProductFromCart,
  deleteOneItem,
  addCheckbox,
  toggleAllCheckbox,
  changeCheckbox,
  deleteSelectCheck,
  noToggleAllCheckbox,
  deleteProductFromHeaderCart,
} = cartSlice.actions
export default cartSlice.reducer
