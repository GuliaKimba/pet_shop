import { useQuery } from '@tanstack/react-query'
import cn from 'classnames'
import stl from './styles.listProducts.module.scss'
import { ItemProducts } from '../ItemProducts/ItemProducts'

const getAllProd = () =>
  fetch('https://api.react-learning.ru/products', {
    headers: {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzhmMWMxMzU5Yjk4YjAzOGY3NzlkOWMiLCJncm91cCI6InNtOCIsImlhdCI6MTY3MTE4MzgzMywiZXhwIjoxNzAyNzE5ODMzfQ.iEOECqS2SMTZhS9geo8sZ0brjJnqqkDQe1JnjhL2Amg',
    },
  }).then((res) => res.json())

export function ListProducts() {
  const { data: response } = useQuery({ queryKey: ['products'], queryFn: getAllProd })

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
