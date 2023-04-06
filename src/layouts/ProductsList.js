import { SimpleGrid } from '@chakra-ui/react'
import { useContext } from 'react'
import { ProductCard } from '../components/cards/ProductCard'
import ProductsContext from '../contexts/ProductsContext'
import { Category } from '../components/Category'

export const ProductsList = () => {
	const { categories, allProducts } = useContext(ProductsContext)

	return (
		<>
			<SimpleGrid columns={{ base: 2, md: 2, lg: 6 }} spacing={8} p={4} alignContent>
				{categories &&
					categories.map(category => <Category key={category.id} category={category} />)}
			</SimpleGrid>

			<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} p={4}>
				{allProducts &&
					allProducts.map(product => <ProductCard key={product.id} product={product} />)}
			</SimpleGrid>
		</>
	)
}
