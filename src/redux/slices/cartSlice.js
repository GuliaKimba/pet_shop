import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    productsInCart: JSON.parse(localStorage.getItem('cart')) || [],
    totalPrice: JSON.parse(localStorage.getItem('totalPrice')) || 0,
    checkAll: true,
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
    addCheckbox: (state, action) => {
      const findProduct = state.productsInCart.find((item) => item._id === action.payload)
      if (findProduct) {
        findProduct.checkbox = !findProduct.checkbox
        // findProduct.count = 0
        // state.totalPrice = state.productsInCart.reduce((sum, obj) => {
        //  if (obj.discount) {
        //    const priceInCart = obj.price - obj.price / obj.discount
        //    return priceInCart * obj.count + sum
        //  }
        //  return obj.price * obj.count + sum
        // }, 0)
      }
      if (findProduct.checkbox === true) {
        // findProduct.count = 1
        // state.totalPrice = state.productsInCart.reduce((sum, obj) => {
        //  if (obj.discount) {
        //    const priceInCart = obj.price - obj.price / obj.discount
        //    return priceInCart * obj.count + sum
        //  }
        //  return obj.price * obj.count + sum
        // }, 0)
      }
      const findTru = state.productsInCart.filter((el) => el.checkbox === true)
      console.log(findTru.length)
      if (findTru.length < 1) {
        state.checkAll = false
      }
      if (findTru.length > 0) {
        state.checkAll = true
      }

      console.log({ findTru })
    },

    toggleAllCheckbox(state) {
      state.checkAll = !state.checkAll
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
      console.log(state.productsInCart)
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
