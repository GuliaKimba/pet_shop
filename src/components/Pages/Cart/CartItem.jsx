import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import stl from './cartItemStyles.module.scss'
import { deleteProductFromCart, addProductToCart, deleteOneItem } from '../../../redux/cart/reducer'

export function CartItem({ ...product }) {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.productsInCart)

  const h = items.find((el) => el._id === product._id)

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
        <input type='checkbox' />
        <div className={cn(stl.cart__img)}>
          <img
            src={product.pictures}
            alt='Фото продукта'
          />
        </div>
        <div className={cn(stl.cart__product_name)}>{product.name}</div>
        <div>
          {product.price * h.count}
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
