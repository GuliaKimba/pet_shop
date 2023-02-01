import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import cn from 'classnames'
import stl from './styles.itemProduct.module.scss'
import { addProductToCart } from '../../../../redux/slices/cartSlice'
import { AddFavorite, NoFavorite } from '../../../Buttons/Buttons'
import { fetchLikes } from '../../../../redux/likesSlice/likesSlice'

export function ItemProducts({ ...item }) {
  const [userLike, setUserLike] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const params = useParams()

  // const productName = params.name

  const productRating = item.reviews.reduce((sum, obj) => obj.rating + sum, 0)

  const rating = Math.floor((productRating / item.reviews.length) * 10) / 10

  let userRating

  if (rating >= 1 && rating < 2) {
    userRating = (
      <button
        className={cn(stl.rating__btn)}
        type='button'>
        {' '}
        ⭐ ☆ ☆ ☆ ☆
      </button>
    )
  } else if (rating >= 2 && rating < 3) {
    userRating = (
      <button
        className={cn(stl.rating__btn)}
        type='button'>
        {' '}
        ⭐ ⭐ ☆ ☆ ☆
      </button>
    )
  } else if (rating >= 3 && rating < 4) {
    userRating = (
      <button
        className={cn(stl.rating__btn)}
        type='button'>
        {' '}
        ⭐ ⭐ ⭐ ☆ ☆
      </button>
    )
  } else if (rating >= 4 && rating < 5) {
    userRating = (
      <button
        className={cn(stl.rating__btn)}
        type='button'>
        {' '}
        ⭐ ⭐ ⭐ ⭐ ☆
      </button>
    )
  } else if (rating >= 5) {
    userRating = (
      <button
        className={cn(stl.rating__btn)}
        type='button'>
        {' '}
        ⭐ ⭐ ⭐ ⭐ ⭐
      </button>
    )
  } else {
    userRating = (
      <button
        className={cn(stl.rating__btn)}
        type='button'>
        {' '}
        ☆ ☆ ☆ ☆ ☆
      </button>
    )
  }

  const priceWithDiscount = item.price - (item.price * item.discount) / 100

  const userId = JSON.parse(localStorage.getItem('userId'))

  const isLikeUser = item.likes.includes(userId)
  useEffect(() => {
    setUserLike(isLikeUser)
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchLikes())
  }, [dispatch])

  const changeProduct = () => {
    navigate(`/product/${item._id}`)
  }
  const handleClick = () => {
    dispatch(addProductToCart(item))
  }

  const clickToFavorite = () => {
    if (userLike === true) {
      setUserLike(false)
    } else {
      setUserLike(true)
    }
  }

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
      <div
        className={cn(stl.cnt__img)}
        onClick={changeProduct}>
        <img
          className={cn(stl.imgg)}
          src={item.pictures}
          alt='Фото продукта'
        />
      </div>

      <div
        onClick={clickToFavorite}
        className={cn(stl.like__cnt)}>
        {userLike ? <AddFavorite {...item} /> : <NoFavorite {...item} />}
      </div>

      <div className={cn(stl.itemWr)}>
        {item.discount > 0 ? (
          <div className={cn(stl.current__price_line_through)}>
            {item.price}
            {' руб.'}
          </div>
        ) : null}
        {item.discount > 0 ? (
          <div className={cn(stl.current__price_red)}>
            {priceWithDiscount}
            {' руб.'}
          </div>
        ) : (
          <div className={cn(stl.current__price)}>
            {item.price}
            {' руб.'}
          </div>
        )}

        <div className={cn(stl.product__wight)}>{item.wight}</div>
        <div className={cn(stl.product__name)}>{item.name}</div>
        <div className={cn(stl.product__rating)}>
          {rating > 0 ? rating : 0}
          {userRating}
        </div>
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
