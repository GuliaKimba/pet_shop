import { createContext, useContext, useMemo } from 'react'
import { useFilter } from './useFilter'

const FilterContext = createContext()
const FilterContextMethod = createContext()

export function FilterContextProvider({ children }) {
  const { search, setSearch } = useFilter()

  const filterContextData = useMemo(
    () => ({
      search,
    }),
    [search],
  )

  const filterContextMethod = useMemo(
    () => ({
      setSearch,
    }),
    [setSearch],
  )

  return (
    <FilterContext.Provider value={filterContextData}>
      <FilterContextMethod.Provider value={filterContextMethod}>
        {children}
      </FilterContextMethod.Provider>
    </FilterContext.Provider>
  )
}

export const useFilterContextData = () => useContext(FilterContext)
export const useFilterContextMethod = () => useContext(FilterContextMethod)
