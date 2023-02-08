import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMutation, useQuery } from '@tanstack/react-query'
import cn from 'classnames'
import { apiAllProducts } from '../../Api/apiProduct'
import stl from './productPageStyle.module.scss'
import { AddFavorite, NoFavorite } from '../../Buttons/Buttons'
import { addProductToCart } from '../../../redux/slices/cartSlice'
import { Comment } from '../../Comment/Comment'
import { fetchLikes } from '../../../redux/likesSlice/likesSlice'
import edit from './edit.png'
import trash from './trash.png'

export function ProductPage() {
  const [userLike, setUserLike] = useState(false)

  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const id = params._id
  const getProductByID = () => apiAllProducts.getCurrentProductById(id)
  const deleteProduct = (productId) => apiAllProducts.deleteMyProduct(productId)

  const {
    data: item,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['currentProduct'],
    queryFn: () => getProductByID(id),
  })

  const { mutateAsync } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      navigate('/')
    },
  })

  const productId = item?._id

  const userId = JSON.parse(localStorage.getItem('userId'))

  const isLikeUser = item?.likes.includes(userId)
  const itemUserId = item?.author._id

  useEffect(() => {
    setUserLike(isLikeUser)
  }, [dispatch])
  useEffect(() => {
    dispatch(fetchLikes())
  }, [dispatch])
  if (isLoading) return <div>Загрузка</div>

  if (!item) return <div>Это ошибка </div>
  if (isError) return <div>{error.message}</div>
  if (item.err) return navigate('*')

  const priceWithDiscount = Math.round(item.price - (item.price * item.discount) / 100)

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

  const handlerSubmit = async (e) => {
    e.preventDefault()
    await mutateAsync(productId)
  }

  const clickToEditForm = () => {
    navigate(`/product/${id}/edit`)
  }

  return (
    <div className={cn(stl.product_page)}>
      <div className={cn(stl.container)}>
        <div className={cn(stl.product__page_detail)}>
          <div className={cn(stl.pictures)}>
            <img
              className={cn(stl.pictures__img)}
              src={item.pictures}
              alt='Фото продукта'
            />
            <div
              onClick={clickToFavorite}
              className={cn(stl.like__cnt)}>
              {userLike ? <AddFavorite {...item} /> : <NoFavorite {...item} />}
            </div>
          </div>

          <div className={cn(stl.product__info)}>
            <div className={cn(stl.product__name)}>{item.name}</div>

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

            <div className={cn(stl.wight)}>
              {'В упаковке: '}
              {item.wight}
            </div>
            <div className={cn(stl.description)}>
              {'Описание товара: '}
              {item.description}
            </div>
            {userId === itemUserId ? (
              <div className={cn(stl.product__btn)}>
                <button
                  onClick={handleClick}
                  className={cn(stl.item__products_btn)}
                  type='button'>
                  в корзину
                </button>
                <button
                  onClick={clickToEditForm}
                  className={cn(stl.item__products_btn_edit)}
                  type='button'>
                  <img
                    src={edit}
                    alt='Редактировать'
                  />
                </button>
                <button
                  onClick={handlerSubmit}
                  className={cn(stl.item__products_btn_delete)}
                  type='button'>
                  <img
                    src={trash}
                    alt='Удалить'
                  />
                </button>
              </div>
            ) : (
              <div className={cn(stl.product__btn)}>
                <button
                  onClick={handleClick}
                  className={cn(stl.item__products_btn)}
                  type='button'>
                  в корзину
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={cn(stl.comment)}>
          <Comment {...item} />
        </div>
        {/* <CommentTest /> */}
      </div>
    </div>
  )
}
