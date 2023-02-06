import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import stl from './styles.notfound.module.scss'
import { Logo } from '../../Logo/Logo'

export function NotFound() {
  const navigate = useNavigate()
  const clickHandler = () => {
    navigate('/')
  }

  return (
    <div className={cn(stl.notfound)}>
      <Logo />

      <div className={cn(stl.notfound__text)}>Страница не найдена</div>
      <button
        onClick={clickHandler}
        className={cn(stl.notfound__btn)}
        type='button'>
        В каталог
      </button>
    </div>
  )
}
