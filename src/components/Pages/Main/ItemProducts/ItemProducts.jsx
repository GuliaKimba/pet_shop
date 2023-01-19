// import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import cn from 'classnames'

import stl from './styles.itemProduct.module.scss'
import { addProductToCart } from '../../../../redux/slices/cartSlice'
import { AddFavorite, NoFavorite } from '../../../Buttons/Buttons'

import { apiAllProducts } from '../../../Api/apiProduct'

// const addLikeApi = (productId) => apiAllProducts.addLikeProducts(productId)
const deleteLikeApi = (productId) => apiAllProducts.deleteLikeProducts(productId)

export function ItemProducts({ ...item }) {
  const priceWithDiscount = item.price - (item.price * item.discount) / 100

  const userId = JSON.parse(localStorage.getItem('userId'))

  const isLikeUser = item.likes.includes(userId)
  const { mutateAsync } = useMutation({
    mutationFn: deleteLikeApi,
  })

  // useEffect(() => {
  //  const isLike = item.likes.includes(userId)
  //  if (isLike) {
  //    setIsLikeUser(isLike)
  //  }
  // }, [addLikeApi])
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const handlerSubmit = async (e) => {
    e.preventDefault()
    await mutateAsync(item._id)
  }

  const handleClick = () => {
    dispatch(addProductToCart(item))
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

      <img
        className={cn(stl.imgg)}
        src={item.pictures}
        alt='Фото продукта'
      />

      <button
        onClick={handlerSubmit}
        type='button'
        className={cn(stl.like__cnt)}>
        {isLikeUser ? <AddFavorite /> : <NoFavorite />}
      </button>

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
