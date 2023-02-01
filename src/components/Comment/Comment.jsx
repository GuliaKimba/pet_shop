import cn from 'classnames'
import stl from './commentStyles.module.scss'

export function Comment({ ...el }) {
  const { rating } = el
  let userRating

  if (rating === 1) {
    userRating = <button type='button'> ⭐ ☆ ☆ ☆ ☆</button>
  } else if (rating === 2) {
    userRating = <button type='button'> ⭐ ⭐ ☆ ☆ ☆</button>
  } else if (rating === 3) {
    userRating = <button type='button'> ⭐ ⭐ ⭐ ☆ ☆</button>
  } else if (rating === 4) {
    userRating = <button type='button'> ⭐ ⭐ ⭐ ⭐ ☆</button>
  } else if (rating === 5) {
    userRating = <button type='button'> ⭐ ⭐ ⭐ ⭐ ⭐</button>
  } else {
    userRating = <button type='button'> ☆ ☆ ☆ ☆ ☆</button>
  }
  return (
    <div>
      <div className={cn(stl.rating__btn)}>{userRating}</div>
      <div>{el.author}</div>
      <div>
        {'Отзыв создан: '}
        {el.created_at}
      </div>
      <div>{el.text}</div>
    </div>
  )
}
