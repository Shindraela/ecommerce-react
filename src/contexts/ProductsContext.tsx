import { createContext, useState, useEffect } from 'react'
import { API_BASE_URL } from '../constants'
import ChildrenProps from '../types/children'
import { requests } from '../services/api.requests'
import IProduct, { ProductsContextType, ProductsResponseType } from '../types/product'

const ProductsContext = createContext<ProductsContextType>({} as ProductsContextType)

export const ProductsProvider = ({ children }: ChildrenProps) => {
	const [products, setProducts] = useState<IProduct[]>([])

	const getProducts = (): Promise<ProductsResponseType> => requests.get(`${API_BASE_URL}/products`)

	useEffect(() => {
		const fetchData = async () => {
			const { data: products } = await getProducts()

			setProducts(products)
		}

		fetchData()
	}, [])

	return (
		<ProductsContext.Provider value={{ products, setProducts }}>
			{children}
		</ProductsContext.Provider>
	)
}

export default ProductsContext
