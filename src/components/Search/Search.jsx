import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import cn from 'classnames'

import stl from './search.module.scss'
import { useFilterContextMethod } from '../FilterContext/FilterContextProvider'
import { useDebounce } from './useDebounce'

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [input, setInput] = useState(() => searchParams.get('query') ?? '')

  const debounceValue = useDebounce(input, 500)

  const { setSearch } = useFilterContextMethod()

  useEffect(() => {
    setSearchParams({ query: input })
  }, [input])

  useEffect(() => {
    setSearch(debounceValue)
  }, [debounceValue])

  return (
    <form className={cn(stl.search__form)}>
      <input
        className={cn(stl.search__input)}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type='search'
        placeholder='Найти'
      />
    </form>
  )
}
