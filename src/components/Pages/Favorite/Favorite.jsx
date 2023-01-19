import cn from 'classnames'
// import { apiAllProducts } from '../../Api/apiProduct'
import stl from './favoriteStyles.module.scss'

// const getAllProd = (filters) => apiAllProducts.getAllProducts(filters)

export function Favorite() {
  return (
    <div className={cn(stl.favorite)}>
      <div className={cn(stl.favorite__container)}>Это страница избранное</div>
    </div>
  )
}
