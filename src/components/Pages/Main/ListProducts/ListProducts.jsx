import cn from 'classnames'
import stl from './styles.listProducts.module.scss'
import { ItemProducts } from '../ItemProducts/ItemProducts'

export function ListProducts({ items }) {
  return (
    <div className={cn(stl.list__products)}>
      {items?.map((item) => (
        <ItemProducts
          key={item.created_at}
          {...item}
        />
      ))}
    </div>
  )
}
