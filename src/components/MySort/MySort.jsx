import cn from 'classnames'
import stl from './mysortstyles.module.scss'

export function MySort({ currentSort, categorys, getSort }) {
  return (
    <div className={cn(stl.sort__cnt)}>
      {categorys.map((category) => (
        <button
          type='button'
          onClick={() => getSort(category.id)}
          className={cn(stl.category, { [stl.selected]: currentSort === category.id })}
          key={category.id}>
          {category.title}
        </button>
      ))}
    </div>
  )
}
