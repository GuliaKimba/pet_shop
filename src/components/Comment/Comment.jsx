import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'
import stl from './commentStyles.module.scss'
import { CommentDetail } from './CommentDetail/CommentDetail'
import { AddComment } from './AddComment/AddComment'
import { fetchRev } from '../../redux/reviewsSlice/revSlice'

export function Comment({ ...item }) {
  const arr = useSelector((state) => state.reviews.rev)

  const dispatch = useDispatch()
  const productId = item._id

  const prodRev = arr.filter((el) => el.product === productId)
  const prodRevSort = prodRev.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  useEffect(() => {
    dispatch(fetchRev())
  }, [item])

  return (
    <div className={cn(stl.container)}>
      <AddComment {...item} />

      <div className={cn(stl.title)}>Отзывы покупателей:</div>
      {item?.reviews.length >= 1 ? (
        <div className={cn(stl.reviews)}>
          {prodRevSort?.map((el) => (
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
