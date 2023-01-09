// import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import cn from 'classnames'

import stl from './styles.itemProduct.module.scss'
import { addProductToCart } from '../../../../redux/cart/reducer'

export function ItemProducts({ ...item }) {
  const priceWithDiscount = item.price - (item.price * item.discount) / 100
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  // const products = useSelector((state) => state.cart.productsInCart)

  // const isProductInCart = products.some((product) => product._id === item._id)

  const handleClick = () => {
    // e.stopPropagation()

    dispatch(addProductToCart(item))
  }

  // const handleClickOpen = () => {
  //  navigate(`product/${item.name}`)
  // }

  return (
    <div className={cn(stl.item__cnt)}>
      {item.discount > 0 ? (
        <button
          className={cn(stl.tags__btn, stl.tags__sale_btn)}
          aria-label='Значки акции'
          type='submit'>
          {`- ${item.discount} %`}
        </button>
      ) : null}

      <div className={cn(stl.product__img)}>
        <img
          src={item.pictures}
          alt='Фото продукта'
        />
      </div>
      <div className={cn(stl.itemWr)}>
        {item.discount > 0 ? (
          <div className={cn(stl.current__price_line_through)}>{item.price}</div>
        ) : null}
        {item.discount > 0 ? (
          <div className={cn(stl.current__price_red)}>{priceWithDiscount}</div>
        ) : (
          <div className={cn(stl.current__price)}>{item.price}</div>
        )}

        <div className={cn(stl.product__wight)}>{item.wight}</div>
        <div className={cn(stl.product__name)}>{item.name}</div>

        <button
          onClick={handleClick}
          className={cn(stl.item__products_btn)}
          type='button'>
          в корзину
        </button>
      </div>
    </div>
  )
}
