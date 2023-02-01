import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import cn from 'classnames'
// import { Sort } from '../../Sort/Sort'
import { useFilterContextData } from '../../FilterContext/FilterContextProvider'
import stl from './styles.main.module.scss'

import { ListProducts } from './ListProducts/ListProducts'
import { apiAllProducts } from '../../Api/apiProduct'
import { Sort } from '../../Sort/Sort'
import { useSort } from './ListProducts/useSort'
import { MySort } from '../../MySort/MySort'

export const PRODUCTS_QUERY_KEY = ['PRODUCTS_QUERY_KEY']

export const getProductsQueryKey = (filters) => PRODUCTS_QUERY_KEY.concat(Object.values(filters))

const getAllProd = (filters) => apiAllProducts.getAllProducts(filters)
export const categorys = [
  {
    id: 'cheap',
    title: 'Сначала дешёвые',
  },
  {
    id: 'expensive',
    title: 'Сначала дорогие',
  },
  {
    id: 'discount',
    title: 'С максимальной скидкой',
  },
]

export function Main() {
  const [currentSort, setCurrentSort] = useState('')
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
  const n = response?.products
  const [items, setItems] = useState([])
  useEffect(() => {
    setItems(n)
  }, [response])
  console.log({ n })
  console.log({ items })
  const { sortPrice, setSortPrice, sortedProducts } = useSort(n)
  if (isLoading) return <div>Загрузка</div>

  if (!response) return <div>Это ошибка </div>
  if (isError) return <div>{error.message}</div>
  if (response.err) return navigate('*')

  const getSort = (current) => {
    setCurrentSort(current)
    if (current === 'cheap') {
      setItems(items.sort((a, b) => a.price - b.price))
    }
    if (current === 'expensive') {
      setItems(items.sort((a, b) => b.price - a.price))
    }
    if (current === 'discount') {
      setItems(items.sort((a, b) => a.discount - b.discount))
    }
  }
  return (
    <div className={cn(stl.main, stl.container)}>
      <MySort
        currentSort={currentSort}
        categorys={categorys}
        getSort={getSort}
      />
      <Sort
        sortPrice={sortPrice}
        setSortPrice={setSortPrice}
      />
      <ListProducts items={items} />
    </div>
  )
}
