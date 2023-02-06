import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import stl from './commentStyles.module.scss'

import { apiAllProducts } from '../Api/apiProduct'
import { CommentDetail } from './CommentDetail/CommentDetail'
import { AddComment } from './AddComment/AddComment'

export function Comment({ ...item }) {
  const getReviews = () => apiAllProducts.getAllReview(item._id)
  const navigate = useNavigate()

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['currentReviews'],
    queryFn: () => getReviews(item._id),
  })

  if (isLoading) return <div>Загрузка</div>

  if (!product) return <div>Это ошибка </div>
  if (isError) return <div>{error.message}</div>
  if (product.err) return navigate('*')

  return (
    <div className={cn(stl.container)}>
      <AddComment {...item} />
      <div className={cn(stl.title)}>Отзывы покупателей:</div>
      {item?.reviews.length >= 1 ? (
        <div className={cn(stl.reviews)}>
          {product?.map((el) => (
            <CommentDetail
              key={el.created_at}
              {...el}
            />
          ))}
        </div>
      ) : (
        <div>У товара еще нет отзывов</div>
      )}
    </div>
  )
}
