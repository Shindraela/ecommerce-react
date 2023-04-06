import { createContext, useState, useEffect } from 'react'
import { REACT_APP_API_BASE_URL } from '../constants'

const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
	const [allProducts, setAllProducts] = useState([])
	const [categories, setCategories] = useState([])

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(`${REACT_APP_API_BASE_URL}/products`)
				const fetchCat = await fetch(`${REACT_APP_API_BASE_URL}/categories`)
				const list = await response.json()
				const allCats = await fetchCat.json()

				setAllProducts([...list])
				setCategories([...allCats])
			} catch (error) {
				console.error(error)
			}
		}

		fetchProducts()
	}, [])

	return (
		<ProductsContext.Provider
			value={{ allProducts, setAllProducts, categories }}
		>
			{children}
		</ProductsContext.Provider>
	)
}

export default ProductsContext
