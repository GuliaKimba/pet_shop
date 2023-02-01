import { useState, useMemo } from 'react'

export const useSort = (products = []) => {
	const [sortPrice, setSortPrice] = useState(false)

  const sortedProducts = useMemo(() => {
		const newProducts = [...products]

    newProducts.sort((a, b) => {
      if (a.price < b.price) return sortPrice ? 1 : -1
      if (a.price > b.price) return sortPrice ? -1 : 1
      return 0
    })

    return newProducts
  }, [sortPrice, products])
  return {
    sortPrice,
    setSortPrice,
    sortedProducts,
  }
}
