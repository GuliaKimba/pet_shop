import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import stl from './styles.listProducts.module.scss'
import { ItemProducts } from '../ItemProducts/ItemProducts'
import { apiAllProducts } from '../../../Api/apiProduct'

export const PRODUCTS_QUERY_KEY = 'PRODUCTS_QUERY_KEY'

const getAllProd = () => apiAllProducts.getAllProducts()

export function ListProducts() {
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [PRODUCTS_QUERY_KEY],
    queryFn: getAllProd,
  })

  const navigate = useNavigate()

  if (isLoading) return <div>Загрузка</div>

  if (!response) return <div>Это ошибка </div>
  if (isError) return <div>{error.message}</div>
  if (response.err) return navigate('*')

  return (
    <div className={cn(stl.list__products)}>
      {response?.products.map((item) => (
        <ItemProducts
          key={item.created_at}
          {...item}
        />
      ))}
    </div>
  )
}
