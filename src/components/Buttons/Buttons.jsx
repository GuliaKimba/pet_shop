import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import cn from 'classnames'
import stl from './buttons.module.scss'
import search from './search.png'
import unFavorites from './unFavorites.png'
import cart from './cart.png'
import profile from './profile.png'
import favoritesBtn from './favoritesBtn.png'
import addFavoritesBtn from './addfavoritesBtn.png'
import logout from './logout.png'
import addProduct from './addProduct.png'
import { apiAllProducts } from '../Api/apiProduct'
import { addLike, deleteLike } from '../../redux/likesSlice/likesSlice'

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
  const userLikes = useSelector((state) => state.likes.usersLike)
  const navigateToPageFavorite = () => {
    navigate('/favorite')
  }
  return (
    <div className={cn(stl.cnt)}>
      <button
        onClick={navigateToPageFavorite}
        type='button'
        className={cn(stl.favorites__btn)}>
        <img
          src={userLikes.length > 0 ? favoritesBtn : unFavorites}
          alt='Избранное'
        />
        <div className={cn(stl.btn__counter)}>{userLikes.length > 0 ? userLikes.length : null}</div>
      </button>
      <div>Избранное</div>
    </div>
  )
}

export function CartBtn() {
  const navigate = useNavigate()

  const { totalPrice, productsInCart } = useSelector((state) => state.cart)
  const allPrice = productsInCart.reduce(
    (sum, item) => sum + Math.round(item.price - (item.price * item.discount) / 100) * item.count,
    0,
  )
  const totalCount = productsInCart.reduce((sum, item) => sum + item.count, 0)

  useEffect(() => {
    const jsonCart = JSON.stringify(productsInCart)
    const jsonPrice = JSON.stringify(totalPrice)

    localStorage.setItem('cart', jsonCart)
    localStorage.setItem('totalPrice', jsonPrice)
  }, [productsInCart])

  const navigateToPageCart = () => {
    navigate('/cart')
  }

  return (
    <div className={cn(stl.cnt)}>
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
          {allPrice > 0 ? (
            <div>
              {allPrice}
              {' руб. '}
            </div>
          ) : null}
        </div>
      </div>
      <div className={cn(stl.btn__text)}>Корзина</div>
    </div>
  )
}

export function AddProductBtn() {
  const navigate = useNavigate()
  const clickHandler = () => {
    navigate('/add-product')
  }
  return (
    <div className={cn(stl.cnt)}>
      <button
        onClick={clickHandler}
        className={cn(stl.cart__btn)}
        type='button'>
        <img
          src={addProduct}
          alt='Добавить товар'
        />
      </button>
      <div>Добавить товар</div>
    </div>
  )
}

export function LogOut() {
  const navigate = useNavigate()
  const clickHandler = () => {
    localStorage.clear()
    navigate('/auth')
  }
  return (
    <div>
      <button
        onClick={clickHandler}
        className={cn(stl.cart__btn)}
        type='button'>
        <img
          src={logout}
          alt='Выйти из системы'
        />
      </button>
    </div>
  )
}

export function ProfileBtn() {
  const navigate = useNavigate()
  const navigateToSingUp = () => {
    navigate('/profile')
  }
  return (
    <div className={cn(stl.cnt)}>
      <button
        onClick={navigateToSingUp}
        type='button'
        className={cn(stl.profile__btn)}>
        <img
          src={profile}
          alt='Личный кабинет'
        />
      </button>
      <div>Профиль</div>
    </div>
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

export function AddFavorite({ ...item }) {
  const dispatch = useDispatch()

  const deleteLikeApi = (productId) => apiAllProducts.deleteLikeProducts(productId)
  const { mutateAsync } = useMutation({
    mutationFn: deleteLikeApi,
  })
  const handlerSubmit = async (e) => {
    e.preventDefault()
    await mutateAsync(item._id)
    dispatch(deleteLike())
  }
  return (
    <button
      onClick={handlerSubmit}
      className={cn(stl.like__btn)}
      type='button'>
      <img
        src={favoritesBtn}
        alt='Кнопка избранное'
      />
    </button>
  )
}

export function NoFavorite({ ...item }) {
  const dispatch = useDispatch()
  const addLikeApi = (productId) => apiAllProducts.addLikeProducts(productId)

  const { mutateAsync } = useMutation({
    mutationFn: addLikeApi,
  })
  const handlerSubmit = async (e) => {
    e.preventDefault()
    await mutateAsync(item._id)
    dispatch(addLike())
  }

  return (
    <button
      onClick={handlerSubmit}
      className={cn(stl.like__btn)}
      type='button'>
      <img
        src={addFavoritesBtn}
        alt='Кнопка избранное'
      />
    </button>
  )
}
