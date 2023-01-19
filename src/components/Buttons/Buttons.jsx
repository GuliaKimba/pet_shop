import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { useMutation } from '@tanstack/react-query'
import cn from 'classnames'
import stl from './buttons.module.scss'
import search from './search.png'
import favorites from './favorites.png'
import cart from './cart.png'
import profile from './profile.png'
import favoritesBtn from './favoritesBtn.png'
import addFavoritesBtn from './addfavoritesBtn.png'
// import { apiAllProducts } from '../Api/apiProduct'

// const addLikeApi = (productId) => apiAllProducts.addLikeProducts(productId)
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
  const navigate = useNavigate()
  const navigateToPageFavorite = () => {
    navigate('/favorite')
  }
  return (
    <button
      onClick={navigateToPageFavorite}
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
  const navigate = useNavigate()

  const { totalPrice, productsInCart } = useSelector((state) => state.cart)
  const totalCount = productsInCart.reduce((sum, item) => sum + item.count, 0)

  const navigateToPageCart = () => {
    navigate('/cart')
  }

  return (
    <div className={cn(stl.btn_container)}>
      <button
        onClick={navigateToPageCart}
        type='button'
        className={cn(stl.cart__btn)}>
        <img
          src={cart}
          alt='Корзина'
        />
      </button>
      <div className={cn(stl.btn__counter)}>
        {productsInCart.length ? <div>{totalCount}</div> : null}
        {totalPrice > 0 ? (
          <div>
            {totalPrice}
            {' руб. '}
          </div>
        ) : null}
      </div>
    </div>
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
    navigate('/signup')
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
    navigate('/signin')
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

export function AddFavorite() {
  // const navigate = useNavigate()

  // const { mutateAsync } = useMutation({
  //  mutationFn: addLikeApi,
  //  onSuccess: () => {
  //    navigate('/test')
  //  },
  // })
  // const handlerSubmit = async (e) => {
  //  e.preventDefault()
  //  await mutateAsync(elem._id)
  // }
  return (
    <button
      // onClick={handlerSubmit}
      className={cn(stl.like__btn)}
      type='button'>
      <img
        src={favoritesBtn}
        alt='Кнопка избранное'
      />
    </button>
  )
}

export function NoFavorite() {
  return (
    <button
      className={cn(stl.like__btn)}
      type='button'>
      <img
        src={addFavoritesBtn}
        alt='Кнопка избранное'
      />
    </button>
  )
}
