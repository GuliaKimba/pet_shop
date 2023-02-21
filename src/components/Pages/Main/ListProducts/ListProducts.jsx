import { useSearchParams } from 'react-router-dom'
import cn from 'classnames'
import stl from './styles.listProducts.module.scss'
import { ItemProducts } from '../ItemProducts/ItemProducts'

export function ListProducts({ items }) {
  const [searchParams, setSearchParams] = useSearchParams()
  console.log({ setSearchParams })
  const abc = searchParams.get('sort') || ''
  console.log({ abc })

  const getSort = () => {
    if (abc === 'default') {
      items.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    }
    if (abc === 'cheap') {
      items.sort(
        (a, b) =>
          Math.round(a.price - (a.price * a.discount) / 100) -
          Math.round(b.price - (b.price * b.discount) / 100),
      )
        ? 1
        : -1
    }
    if (abc === 'expensive') {
      items.sort(
        (a, b) =>
          Math.round(b.price - (b.price * b.discount) / 100) -
          Math.round(a.price - (a.price * a.discount) / 100),
      )
    }
    if (abc === 'discount') {
      items.sort((a, b) => b.discount - a.discount)
    }
    if (abc === 'new') {
      items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
    if (abc === 'popular') {
      items.sort((a, b) => b.likes.length - a.likes.length)
    }

    return items
  }
  console.log({ items })
  return (
    <div className={cn(stl.list__products)}>
      {items
        ?.map((item) => (
          <ItemProducts
            key={item.created_at}
            {...item}
          />
        ))
        .sort(getSort)}
    </div>
  )
}
