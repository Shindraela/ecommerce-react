import { createContext, useState, useEffect } from 'react'
import { API_BASE_URL } from '../constants'
import ChildrenProps from '../types/children'
import { requests } from '../services/api.requests'
import ICategory, { CategoriesContextType, CategoriesResponseType } from '../types/category'
import { ProductsResponseType } from '../types/product'

const CategoriesContext = createContext<CategoriesContextType>({} as CategoriesContextType)

export const CategoriesProvider = ({ children }: ChildrenProps) => {
	const [categories, setCategories] = useState<ICategory[]>([])

	const getCategories = (): Promise<CategoriesResponseType> =>
		requests.get(`${API_BASE_URL}/categories`)

	const getProductsByCategory = (categoryName: string): Promise<ProductsResponseType> =>
		categoryName === 'all'
			? requests.get(`${API_BASE_URL}/products`)
			: requests.get(`${API_BASE_URL}/products/findByFilter/?category=${categoryName}`)

	useEffect(() => {
		const fetchData = async () => {
			const { data: categories } = await getCategories()

			setCategories(categories)
		}

		fetchData()
	}, [])

	return (
		<CategoriesContext.Provider value={{ categories, setCategories, getProductsByCategory }}>
			{children}
		</CategoriesContext.Provider>
	)
}

export default CategoriesContext
