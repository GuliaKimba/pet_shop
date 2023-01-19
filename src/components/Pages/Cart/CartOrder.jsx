import cn from 'classnames'
import { useSelector } from 'react-redux'
import stl from './cartOrderStyles.module.scss'

export function CartOrder() {
  // const items = useSelector((state) => state.cart.productsInCart)

  const { totalPrice, productsInCart } = useSelector((state) => state.cart)
  const totalCount = productsInCart.reduce((sum, item) => sum + item.count, 0)

  // const h = items.find((el) => el._id === product._id)
  return (
    <div className={cn(stl.cart__order)}>
      <button
        className={cn(stl.btn__order)}
        type='button'>
        Оформить заказ
      </button>
      <div className={cn(stl.our__cart)}>В Вашей корзине</div>
      <div>
        <div>
          {totalCount}
          {' тов. '}
        </div>
        <div>
          {'на сумму '}
          {totalPrice}
          {' руб. '}
        </div>
      </div>
    </div>
  )
}
