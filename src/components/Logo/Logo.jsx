import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import stl from './styles.logo.module.scss'
import logo from './logo.png'

export function Logo() {
  const navigate = useNavigate()
  const handleSubmit = () => navigate('/')

  return (
    <div className={cn(stl.logo)}>
      <button
        type='button'
        onClick={handleSubmit}
        className={cn(stl.logo__cnt_img)}>
        <img
          className={cn(stl.logo__img)}
          src={logo}
          alt='Логотип'
        />
      </button>
      <div className={cn(stl.logo__text)}>PetShop</div>
    </div>
  )
}
