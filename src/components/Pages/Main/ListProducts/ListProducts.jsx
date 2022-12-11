import { useState, useEffect } from 'react'
import cn from 'classnames'
import stl from './styles.listProducts.module.scss'
import { ItemProducts } from '../ItemProducts/ItemProducts'
import { api } from '../../../Api/apiProduct'

export function ListProducts() {
  const [items, setItems] = useState([])

  useEffect(() => {
    api.getAllProducts().then((arr) => setItems(arr.products))
  }, [])

  return (
    <div className={cn(stl.list__products)}>
      {items.map((item) => (
        <ItemProducts
          key={item.created_at}
          {...item}
        />
      ))}
    </div>
  )
}
