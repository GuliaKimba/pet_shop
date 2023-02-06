import cn from 'classnames'
import { useSelector } from 'react-redux'
import stl from './cartOrderStyles.module.scss'

export function CartOrder() {
  const { productsInCart } = useSelector((state) => state.cart)
  const arr = productsInCart.filter((item) => item.checkbox === true)

  const myArr = arr.reduce(
    (sum, item) => sum + Math.round(item.price - (item.price * item.discount) / 100) * item.count,
    0,
  )
  const myCount = arr.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className={cn(stl.cart__order)}>
      <button
        className={cn(stl.btn__order)}
        type='button'>
        Оформить заказ
      </button>
      <div className={cn(stl.our__cart)}>Выбрано</div>
      <div>
        <div>
          {myCount}
          {' тов. '}
        </div>
        <div>
          {'на сумму '}

          {myArr}
          {' руб. '}
        </div>
      </div>
    </div>
  )
}
