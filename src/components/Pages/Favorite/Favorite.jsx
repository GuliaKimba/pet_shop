import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'
import { fetchLikes } from '../../../redux/likesSlice/likesSlice'
import { ItemProducts } from '../Main/ItemProducts/ItemProducts'
import stl from './favoriteStyles.module.scss'

export function Favorite() {
  const arr = useSelector((state) => state.likes.usersLike)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchLikes())
  }, [dispatch])

  const navigate = useNavigate()
  const navigateToMainPage = () => {
    navigate('/')
  }

  return (
    <div className={cn(stl.favorite)}>
      {arr.length > 0 ? (
        <div className={cn(stl.favorite__container)}>
          {arr.map((item) => (
            <ItemProducts
              key={item.created_at}
              {...item}
            />
          ))}
        </div>
      ) : (
        <div className={cn(stl.favorite__container)}>
          <div className={cn(stl.favorite__text)}>
            В избранном еще нет товаров
            <button
              className={cn(stl.empty__cart_btn)}
              onClick={navigateToMainPage}
              type='button'>
              Перейти в каталог
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
