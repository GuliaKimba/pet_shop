import cn from 'classnames'
// import { getSearchParamsForLocation } from 'react-router-dom/dist/dom'

import stl from './style.sort.module.scss'

export function Sort({ sortPrice, setSortPrice }) {
  return (
    <div className={cn(stl.sort__cnt)}>
      <button
        onClick={() => setSortPrice(!sortPrice)}
        type='button'>
        По Цене
        {`${sortPrice ? '↑' : '↓'}`}
      </button>
    </div>
  )
}
