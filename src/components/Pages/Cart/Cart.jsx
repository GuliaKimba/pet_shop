import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import cn from 'classnames'
import stl from './cartstyles.module.scss'
import { apiAllProducts } from '../../Api/apiProduct'
import { CartItem } from './CartItem'
import { CartOrder } from './CartOrder'
import { EmptyCart } from './EmptyCart'

export function Cart() {
  const items = useSelector((state) => state.cart.productsInCart)

  const { data: products } = useQuery({
    queryKey: ['items'],
    queryFn: () => apiAllProducts.getProductsById(items.map((product) => product._id)),
  })

  return (
    <div className={cn(stl.container)}>
      <div className={cn(stl.cart__container)}>
        {items.length > 0 ? (
          <div className={cn(stl.cart__product)}>
            <div className={cn(stl.cart__product_header)}>
              <input type='checkbox' />
              <span>Выбрать все</span>
              <button type='button'>Удалить выбранные</button>
            </div>
            <div className={cn(stl.cart__order)}>
              <div className={cn(stl.cart_items)}>
                {products?.map((product) => (
                  <CartItem
                    {...items}
                    {...product}
                    key={product.created_at}
                  />
                ))}
              </div>
              <div className={cn(stl.cart__block)}>
                {products?.map((product) => (
                  <CartOrder
                    {...items}
                    {...product}
                    key={product.created_at}
                  />
                ))}
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
