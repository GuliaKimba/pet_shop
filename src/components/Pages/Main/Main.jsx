import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import cn from 'classnames'
import { useFilterContextData } from '../../FilterContext/FilterContextProvider'
import stl from './styles.main.module.scss'
import { ListProducts } from './ListProducts/ListProducts'
import { apiAllProducts } from '../../Api/apiProduct'
import { MySort } from '../../MySort/MySort'

export const PRODUCTS_QUERY_KEY = ['PRODUCTS_QUERY_KEY']

export const getProductsQueryKey = (filters) => PRODUCTS_QUERY_KEY.concat(Object.values(filters))

const getAllProd = (filters) => apiAllProducts.getAllProducts(filters)
export const categorys = [
  {
    id: 'default',
    title: 'По умолчанию',
  },
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
  {
    id: 'new',
    title: 'Новинки',
  },
  {
    id: 'popular',
    title: 'По популярности',
  },
]

export function Main() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentSort, setCurrentSort] = useState(() => searchParams.get('sort') ?? '')
  console.log({ currentSort })

  const filters = useFilterContextData()
  const [items, setItems] = useState([])
  const getSort = (current) => {
    setCurrentSort(current)

    if (current === 'default') {
      setItems(items.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)))
    }
    if (current === 'cheap') {
      setItems(items.sort((a, b) => (a.price > b.price ? 1 : -1)))
    }
    if (current === 'expensive') {
      setItems(items.sort((a, b) => b.price - a.price))
    }
    if (current === 'discount') {
      setItems(items.sort((a, b) => b.discount - a.discount))
    }
    if (current === 'new') {
      setItems(items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
    }
    if (current === 'popular') {
      setItems(items.sort((a, b) => b.likes.length - a.likes.length))
    }

    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sort: current,
    })
  }

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
        sort: filters.sort,
      }),
  })
  const navigate = useNavigate()
  const n = response?.products

  useEffect(() => {
    setItems(n)
  }, [response])

  useEffect(() => {
    if (!currentSort) setSearchParams({ ...Object.fromEntries(searchParams.entries()) })
    else {
      setSearchParams({ ...Object.fromEntries(searchParams.entries()), sort: currentSort })
    }
  }, [items])

  if (isLoading) return <div className={cn(stl.loading)}>Загрузка</div>

  if (!response) return <div>Это ошибка </div>
  if (isError) return <div>{error.message}</div>
  if (response.err) return navigate('*')

  return (
    <div className={cn(stl.main, stl.container)}>
      <MySort
        currentSort={currentSort}
        categorys={categorys}
        getSort={getSort}
      />

      <ListProducts
        currentSort={currentSort}
        items={items}
      />
    </div>
  )
}
