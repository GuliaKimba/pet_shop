import { useState } from 'react'

export function useFilter() {
  const [search, setSearch] = useState('')

  return { search, setSearch }
}
