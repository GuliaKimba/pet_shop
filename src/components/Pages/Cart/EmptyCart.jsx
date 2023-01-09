import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import stl from './emptyCartStyles.module.scss'

export function EmptyCart() {
  const navigate = useNavigate()
  const navigateToMainPage = () => {
    navigate('/')
  }
  return (
    <div className={cn(stl.container)}>
      <div>Корзина пуста</div>
      <button
        className={cn(stl.empty__cart_btn)}
        onClick={navigateToMainPage}
        type='button'>
        Перейти в каталог
      </button>
    </div>
  )
}
