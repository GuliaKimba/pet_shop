import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import stl from './buttons.module.scss'
import search from './search.png'
import favorites from './favorites.png'
import cart from './cart.png'
import profile from './profile.png'

export function SearchBtn() {
  return (
    <button
      className={cn(stl.search__btn)}
      type='button'>
      <img
        src={search}
        alt='Поиск'
      />
    </button>
  )
}

export function FavoritesBtn() {
  return (
    <button
      type='button'
      className={cn(stl.favorites__btn)}>
      <img
        src={favorites}
        alt='Избранное'
      />
    </button>
  )
}

export function CartBtn() {
  return (
    <button
      type='button'
      className={cn(stl.cart__btn)}>
      <img
        src={cart}
        alt='Корзина'
      />
    </button>
  )
}

export function ProfileBtn() {
  const navigate = useNavigate()
  const navigateToSingUp = () => {
    navigate('/profile')
  }
  return (
    <button
      onClick={navigateToSingUp}
      type='button'
      className={cn(stl.profile__btn)}>
      <img
        src={profile}
        alt='Личный кабинет'
      />
    </button>
  )
}

export function SingupBtn() {
  const navigate = useNavigate()
  const navigateToSingUp = () => {
    navigate('/singup')
  }
  return (
    <button
      onClick={navigateToSingUp}
      type='button'
      className={cn(stl.singup__btn)}>
      Зарегистрироваться
    </button>
  )
}
export function SinginBtn() {
  const navigate = useNavigate()
  const navigateToSingIn = () => {
    navigate('/singin')
  }
  return (
    <button
      onClick={navigateToSingIn}
      type='button'
      className={cn(stl.singin__btn)}>
      Войти
    </button>
  )
}
