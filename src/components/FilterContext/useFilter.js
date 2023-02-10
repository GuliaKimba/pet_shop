import { useState } from 'react'

export function useFilter() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')

  return { search, setSearch, sort, setSort }
}
