import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import cn from 'classnames'
import stl from './cartstyles.module.scss'
import { apiAllProducts } from '../../Api/apiProduct'
import { CartItem } from './CartItem/CartItem'
import { CartOrder } from './CartOrder/CartOrder'
import { EmptyCart } from './EmptyCart/EmptyCart'
import {
  deleteSelectCheck,
  noToggleAllCheckbox,
  toggleAllCheckbox,
} from '../../../redux/slices/cartSlice'

export function Cart() {
  const { checkAll } = useSelector((state) => state.cart)

  const [isAllCheck, setIsAllCheck] = useState(checkAll)

  const dispatch = useDispatch()

  const items = useSelector((state) => state.cart.productsInCart)

  const { data: products } = useQuery({
    queryKey: ['itemsCart'].concat(items.map((item) => item._id)),
    queryFn: () => apiAllProducts.getProductsById(items.map((product) => product._id)),
  })
  const changeAll = () => {
    setIsAllCheck(!isAllCheck)

    return isAllCheck === true
      ? dispatch(toggleAllCheckbox(products))
      : dispatch(noToggleAllCheckbox(products))
  }

  const deleteSelCheck = () => {
    if (window.confirm('Вы действительно хотите удалить продукт из корзины?')) {
      dispatch(deleteSelectCheck(items))
    }
  }

  return (
    <div className={cn(stl.cart)}>
      <div className={cn(stl.cart__container)}>
        {items.length > 0 ? (
          <div className={cn(stl.cart__product)}>
            <div className={cn(stl.cart__product_header)}>
              <input
                onChange={() => changeAll()}
                type='checkbox'
                name='allSelect'
                checked={checkAll}
              />
              <span>Выбрать все</span>
              <button
                className={cn(stl.cart__btn)}
                onClick={() => deleteSelCheck()}
                type='button'>
                Удалить выбранные
              </button>
            </div>
            <div className={cn(stl.cart__order)}>
              <div className={cn(stl.cart_items)}>
                {products?.map((product) => (
                  <CartItem
                    {...product}
                    setIsAllCheck={setIsAllCheck}
                    key={product.created_at}
                  />
                ))}
              </div>
              <div className={cn(stl.cart__block)}>
                <CartOrder {...products} />
              </div>
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  )
}
