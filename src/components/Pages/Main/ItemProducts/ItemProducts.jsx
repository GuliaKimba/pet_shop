import { useState, useEffect } from 'react'
import cn from 'classnames'

import stl from './styles.itemProduct.module.scss'
import { apiToken } from '../../../Api/apiAuth'

export function ItemProducts({ pictures, price, discount, wight, name, likes }) {
  const priceWithDiscount = price - (price * discount) / 100
  const [like, setLike] = useState('')
  const [userID, setUserID] = useState('')
  const infoUserID = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    apiToken
      .getUserByToken(infoUserID)
      .then((res) => res)
      .then((resp) => setUserID(resp._id))
  })
  if (likes.includes(userID)) {
    setLike(userID)
  }
  console.log({ like })
  return (
    <div className={cn(stl.item__cnt)}>
      {discount > 0 ? (
        <button
          className={cn(stl.tags__btn, stl.tags__sale_btn)}
          aria-label='Значки акции'
          type='submit'>
          {`- ${discount} %`}
        </button>
      ) : null}

      <button
        className={cn(stl.favorites_btn, stl.add__favorites_btn)}
        aria-label='Добавить в избранное'
        type='submit'>
        {like}
      </button>
      <div className={cn(stl.product__img)}>
        <img
          src={pictures}
          alt='Фото продукта'
        />
      </div>
      <div className={cn(stl.itemWr)}>
        {discount > 0 ? <div className={cn(stl.current__price_line_through)}>{price}</div> : null}
        {discount > 0 ? (
          <div className={cn(stl.current__price_red)}>{priceWithDiscount}</div>
        ) : (
          <div className={cn(stl.current__price)}>{price}</div>
        )}

        <div className={cn(stl.product__wight)}>{wight}</div>
        <div className={cn(stl.product__name)}>{name}</div>

        <button
          className={cn(stl.item__products_btn)}
          type='button'>
          В корзину
        </button>
      </div>
    </div>
  )
}
