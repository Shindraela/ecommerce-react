import { createContext, useState, useEffect } from 'react'
import { API_BASE_URL } from '../constants'
import ChildrenProps from '../types/children'
import { requests } from '../services/api.requests'
import ICategory, { CategoriesContextType, CategoriesResponseType } from '../types/category'

const CategoriesContext = createContext<CategoriesContextType>({} as CategoriesContextType)

export const CategoriesProvider = ({ children }: ChildrenProps) => {
	const [categories, setCategories] = useState<ICategory[]>([])

	const getCategories = (): Promise<CategoriesResponseType> =>
		requests.get(`${API_BASE_URL}/categories`)

	useEffect(() => {
		const fetchData = async () => {
			const { data: categories } = await getCategories()

			setCategories(categories)
		}

		fetchData()
	}, [])

	return (
		<CategoriesContext.Provider value={{ categories, setCategories }}>
			{children}
		</CategoriesContext.Provider>
	)
}

export default CategoriesContext
