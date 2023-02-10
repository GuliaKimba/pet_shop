import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import stl from './cartItemStyles.module.scss'
import {
  deleteProductFromCart,
  addProductToCart,
  deleteOneItem,
  deleteProductFromHeaderCart,
  addCheckbox,
} from '../../../../redux/slices/cartSlice'

export function CartItem({ ...product }) {
  const dispatch = useDispatch()
  const { productsInCart } = useSelector((state) => state.cart)
  const { stock, price, discount } = product
  const priceWithDiscount = Math.round(price - (price * discount) / 100)

  const h = productsInCart.find((el) => el._id === product._id)

  const handleClick = () => {
    if (window.confirm('Вы действительно хотите удалить продукт из корзины?')) {
      dispatch(deleteProductFromCart(product))
    }
  }

  const handleClick1 = () => {
    if (window.confirm('Вы действительно хотите удалить продукт из корзины?')) {
      dispatch(deleteProductFromHeaderCart(product))
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

  const changeCheck = () => {
    dispatch(addCheckbox(product._id))
  }

  return (
    <div className={cn(stl.cart__container)}>
      <div className={cn(stl.cart__item)}>
        <input
          onChange={() => changeCheck()}
          name={product.name}
          type='checkbox'
          checked={h.checkbox}
        />
        <div className={cn(stl.cart__img)}>
          <img
            src={product.pictures}
            alt='Фото продукта'
          />
        </div>

        <div className={cn(stl.cart__product_name)}>{product.name}</div>
        {discount > 0 ? (
          <div className={cn(stl.cart__price)}>

            <div className={cn(stl.cart__price_black)}>
              {price * h.count}
              {' руб.'}
            </div>
            <div className={cn(stl.cart__price_red)}>
              {priceWithDiscount * h.count}
              {' руб.'}
            </div>
          </div>
        ) : (
          <div>
            {price * h.count}
            {' руб.'}
          </div>
        )}

        <div className={cn(stl.cart__count)}>
          <button
            onClick={h.count <= 1 ? handleClick : deleteItemClick}
            className={cn(stl.cart__btn)}
            type='button'>
            -
          </button>
          <div className={cn(stl.counter)}>{h.count}</div>

          <button
            onClick={addItemClick}
            disabled={h.count >= stock}
            className={cn(stl.cart__btn)}
            type='button'>
            +
          </button>
        </div>
        <button
          className={cn(stl.cart__btn_delete)}
          onClick={productsInCart.length > 1 ? handleClick : handleClick1}
          type='button'>
          Удалить
        </button>
      </div>
    </div>
  )
}
