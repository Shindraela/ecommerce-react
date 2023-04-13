import { createContext, useState, useEffect } from 'react'
import { REACT_APP_API_BASE_URL } from '../constants'
import ChildrenProps from '../types/children'
import IProduct, { ProductsContextType } from '../types/product'
import ICategory from '../types/category'

const ProductsContext = createContext<ProductsContextType>({} as ProductsContextType)

export const ProductsProvider = ({ children }: ChildrenProps) => {
	const [allProducts, setAllProducts] = useState<IProduct[]>([])
	const [categories, setCategories] = useState<ICategory[]>([])

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
		<ProductsContext.Provider value={{ allProducts, setAllProducts, categories }}>
			{children}
		</ProductsContext.Provider>
	)
}

export default ProductsContext
