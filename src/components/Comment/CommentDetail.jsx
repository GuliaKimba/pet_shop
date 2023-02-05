import cn from 'classnames'
import stl from './сommentDetailStyles.module.scss'
import trash from './trash.png'
import edit from './edit.png'

export function CommentDetail({ ...el }) {
  const userId = JSON.parse(localStorage.getItem('userId'))

  const myId = el.author._id
  console.log({ myId })
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
            <button className={cn(stl.comment__btn)} type='button'>
              <img
                src={trash}
                alt='Удалить'
              />
            </button>
          ) : null}
        </div>
        <div>
          {userId === myId ? (
            <button className={cn(stl.comment__btn)} type='button'>
              <img
                src={edit}
                alt='Редактировать'
              />
            </button>
          ) : null}
        </div>
      </div>

      <div className={cn(stl.text)}>{el.text}</div>
    </div>
  )
}
