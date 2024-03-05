import { SimpleGrid } from '@chakra-ui/react'
import { useContext } from 'react'
import { ProductCard } from '../components/cards/ProductCard'
import ProductsContext from '../contexts/ProductsContext'
import CategoriesContext from '../contexts/CategoriesContext'
import { Category } from '../components/Category'

export const ProductsList = () => {
	const { products } = useContext(ProductsContext)
	const { categories } = useContext(CategoriesContext)

	return (
		<>
			<SimpleGrid columns={{ base: 2, md: 2, lg: 6 }} spacing={8} p={4}>
				{categories &&
					categories.map(category => <Category key={category._id} category={category} />)}
			</SimpleGrid>

			<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} p={4}>
				{products && products.map(product => <ProductCard key={product._id} product={product} />)}
			</SimpleGrid>
		</>
	)
}
