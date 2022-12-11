import cn from 'classnames'
import { Sort } from '../../Sort/Sort'
import stl from './styles.main.module.scss'

import { ListProducts } from './ListProducts/ListProducts'

export function Main() {
  return (
    <div className={cn(stl.main, stl.container)}>
      <Sort />
      <ListProducts />
    </div>
  )
}
