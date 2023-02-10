import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import cn from 'classnames'
import stl from './сommentDetailStyles.module.scss'
import trash from './trash.png'

import { deleteRev } from '../../../redux/reviewsSlice/revSlice'

export function CommentDetail({ ...el }) {
  const idProd = el.product
  const idRev = el._id
  const userId = JSON.parse(localStorage.getItem('userId'))

  async function deleteReview() {
    const JWT = JSON.parse(localStorage.getItem('token'))
    const res = await fetch(`https://api.react-learning.ru/products/review/${idProd}/${idRev}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${JWT}`,
      },
    })
    return res.json()
  }

  const dispatch = useDispatch()

  const { mutateAsync } = useMutation({
    mutationFn: deleteReview,
  })
  const handlerSubmit = async (e) => {
    e.preventDefault()
    await mutateAsync(idRev)
    dispatch(deleteRev())
  }
  const myId = el.author._id

  const { rating } = el
  let userRating
  if (rating === 1) {
    userRating = <div> ⭐ ☆ ☆ ☆ ☆</div>
  } else if (rating === 2) {
    userRating = <div> ⭐ ⭐ ☆ ☆ ☆</div>
  } else if (rating === 3) {
    userRating = <div> ⭐ ⭐ ⭐ ☆ ☆</div>
  } else if (rating === 4) {
    userRating = <div> ⭐ ⭐ ⭐ ⭐ ☆</div>
  } else if (rating === 5) {
    userRating = <div> ⭐ ⭐ ⭐ ⭐ ⭐</div>
  } else {
    userRating = <div> ☆ ☆ ☆ ☆ ☆</div>
  }
  return (
    <div className={cn(stl.container)}>
      <div className={cn(stl.discription)}>
        <div className={cn(stl.name)}>
          <div className={cn(stl.img)}>
            <img
              src={el.author.avatar}
              alt='Аватар пользователя'
            />
          </div>
          <div>{el.author.name}</div>
        </div>
        <div className={cn(stl.rating___cnt)}>
          <div className={cn(stl.created)}>{new Date(el.created_at).toDateString()}</div>
          <div className={cn(stl.rating)}>{userRating}</div>
        </div>
        <div>
          {userId === myId ? (
            <button
              onClick={handlerSubmit}
              className={cn(stl.comment__btn)}
              type='button'>
              <img
                src={trash}
                alt='Удалить'
              />
            </button>
          ) : null}
        </div>
      </div>

      <div className={cn(stl.text)}>{el.text}</div>
    </div>
  )
}
