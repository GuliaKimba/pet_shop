// import { useQuery } from '@tanstack/react-query'
// import { useNavigate } from 'react-router-dom'
// import { useState, useEffect } from 'react'
import cn from 'classnames'
import stl from './styles.listProducts.module.scss'
import { ItemProducts } from '../ItemProducts/ItemProducts'
// import { useSort } from './useSort'
// import { useSort } from './useSort'

// import { useSort } from './useSort'
// import { apiAllProducts } from '../../../Api/apiProduct'
// import { useFilterContextData } from '../../../FilterContext/FilterContextProvider'
// import { useSort } from './useSort'

// export const PRODUCTS_QUERY_KEY = ['PRODUCTS_QUERY_KEY']

// export const getProductsQueryKey = (filters) => PRODUCTS_QUERY_KEY.concat(Object.values(filters))

// onst getAllProd = (filters) => apiAllProducts.getAllProducts(filters)

export function ListProducts({ items }) {
  // console.log({ response })
  // const a = response.products
  // console.log({ a })

  // const [items, setItems] = useState([])
  // const prod = all ? all.products : items
  // useEffect(() => {
  //  setItems(prod)
  // }, [all])
  // const filters = useFilterContextData()

  // const {
  //  data: response,
  //  // isLoading,
  //  // isError,
  //  // error,
  // } = useQuery({
  //  queryKey: getProductsQueryKey(filters),
  //  queryFn: () =>
  //    getAllProd({
  //      query: filters.search,
  //    }),
  // })

  //

  // const all = response?.products

  // const { sortPrice, setSortPrice, sortedProducts } = useSort(a)

  // if (isLoading) return <div>Загрузка</div>

  // if (!response) return <div>Это ошибка </div>
  // if (isError) return <div>{error.message}</div>
  // if (response.err) return navigate('*')

  return (
    <div className={cn(stl.list__products)}>
      {/* <button type='button' onClick={() => setSortPrice(!sortPrice)}>
        сортировка по
      </button> */}
      {items?.map((item) => (
        <ItemProducts
          key={item.created_at}
          {...item}
        />
      ))}
    </div>
  )
}
