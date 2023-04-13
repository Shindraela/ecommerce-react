import { Button } from '@chakra-ui/react'
import { useContext } from 'react'
import ProductsContext from '../contexts/ProductsContext'
import { REACT_APP_API_BASE_URL } from '../constants'
import ICategory from '../types/category'

type CategoryProps = {
	category: ICategory
}

export const Category = ({ category }: CategoryProps) => {
	const { setAllProducts } = useContext(ProductsContext)

	const fetchProductsByCategory = async () => {
		const response = await fetch(`${REACT_APP_API_BASE_URL}/products/?categoryId=${category.id}`)
		const json = await response.json()

		setAllProducts([...json])
	}

	return (
		<Button colorScheme='teal' variant='solid' onClick={fetchProductsByCategory}>
			{category.name}
		</Button>
	)
}
