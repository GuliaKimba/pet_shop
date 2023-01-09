import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import stl from './styles.listProducts.module.scss'
import { ItemProducts } from '../ItemProducts/ItemProducts'
import { apiAllProducts } from '../../../Api/apiProduct'
import { useFilterContextData } from '../../../FilterContext/FilterContextProvider'

export const PRODUCTS_QUERY_KEY = ['PRODUCTS_QUERY_KEY']

export const getProductsQueryKey = (filters) => PRODUCTS_QUERY_KEY.concat(Object.values(filters))

const getAllProd = (filters) => apiAllProducts.getAllProducts(filters)

export function ListProducts() {
  const filters = useFilterContextData()

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: getProductsQueryKey(filters),
    queryFn: () =>
      getAllProd({
        query: filters.search,
      }),
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
