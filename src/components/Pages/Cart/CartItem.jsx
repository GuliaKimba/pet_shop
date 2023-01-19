// import { useState } from 'react'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import stl from './cartItemStyles.module.scss'
import {
  deleteProductFromCart,
  addProductToCart,
  deleteOneItem,
  // deleteCheckbox,
} from '../../../redux/slices/cartSlice'

export function CartItem({ ...product }) {
  // const [check, setCheck] = useState(true)
  const dispatch = useDispatch()
  const { productsInCart } = useSelector((state) => state.cart)

  const h = productsInCart.find((el) => el._id === product._id)
  console.log({ h })
  console.log({ productsInCart })

  const handleClick = () => {
    if (window.confirm('Вы действительно хотите удалить продукт из корзины?')) {
      dispatch(deleteProductFromCart(product))
    }
  }

  const addItemClick = (e) => {
    e.stopPropagation()
    dispatch(addProductToCart(product))
  }

  const deleteItemClick = (e) => {
    e.stopPropagation()
    dispatch(deleteOneItem(h._id))
  }

  return (
    <div className={cn(stl.cart__container)}>
      <div className={cn(stl.cart__item)}>
        <input
          type='checkbox'
          checked={product._id.checked}
        />
        <div className={cn(stl.cart__img)}>
          <img
            src={product.pictures}
            alt='Фото продукта'
          />
        </div>
        <div className={cn(stl.cart__product_name)}>{product.name}</div>
        <div>
          {product.price}
          руб.
        </div>

        <div className={cn(stl.cart__count)}>
          <button
            onClick={h.count <= 1 ? handleClick : deleteItemClick}
            className={cn(stl.cart__btn)}
            type='button'>
            -
          </button>
          <div>{h.count}</div>
          {/* <div>jjj</div> */}
          <button
            onClick={addItemClick}
            className={cn(stl.cart__btn)}
            type='button'>
            +
          </button>
        </div>
        <button
          className={cn(stl.cart__btn_delete)}
          onClick={handleClick}
          type='button'>
          Удалить
        </button>
      </div>
    </div>
  )
}
