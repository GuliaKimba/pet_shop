import cn from 'classnames'
import { useSelector } from 'react-redux'
import stl from './cartOrderStyles.module.scss'

export function CartOrder({ ...product }) {
  const items = useSelector((state) => state.cart.productsInCart)

  const h = items.find((el) => el._id === product._id)
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
          {h.count}
          товар(ов)
        </div>
        <div>
          на сумму
          {product.price * h.count}
          руб
        </div>
      </div>
    </div>
  )
}
