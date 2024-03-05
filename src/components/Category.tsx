import { Button } from '@chakra-ui/react'
import { useContext } from 'react'
import ProductsContext from '../contexts/ProductsContext'
import ICategory from '../types/category'
import CategoriesContext from '../contexts/CategoriesContext'

type CategoryProps = {
	category: ICategory
}

export const Category = ({ category }: CategoryProps) => {
	const { setProducts } = useContext(ProductsContext)
	const { getProductsByCategory } = useContext(CategoriesContext)

	const setProductsByCategory = async (categoryName: string) => {
		const { data } = await getProductsByCategory(categoryName)
		setProducts(data)
	}

	return (
		<>
			<Button
				colorScheme='teal'
				variant='solid'
				onClick={() => setProductsByCategory(category.name)}
			>
				{category.common}
			</Button>
		</>
	)
}
