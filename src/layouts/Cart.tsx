import { useContext } from 'react'
import { SimpleGrid, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import CartContext from '../contexts/CartContext'
import { CartCard } from '../components/cards/CartCard'
import { PaymentForm } from '../components/forms/PaymentForm'
import ProductsContext from '../contexts/ProductsContext'
import { formattedCart } from '../utils'

const currencyOptions = {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
}

export const Cart = () => {
	const { cart, getTotal } = useContext(CartContext)
	const { products } = useContext(ProductsContext)
	const currentCart = () =>
		Object.keys(cart).map(productId => formattedCart(products, cart[productId]))
	const total = getTotal()

	return (
		<SimpleGrid spacing='40px' columns={{ sm: 1, lg: 2 }}>
			<PaymentForm />

			<Flex direction='column' p={6}>
				<Heading w='100%' size='md' fontWeight='bold' pb={4}>
					Your order
				</Heading>

				{currentCart() && currentCart().length > 0 ? (
					<Stack
						borderWidth='1px'
						borderRadius='lg'
						w={{ sm: '100%' }}
						direction='column'
						boxShadow='1xl'
					>
						{currentCart() &&
							currentCart().map(product => {
								return <CartCard key={product._id} product={product} />
							})}
					</Stack>
				) : (
					<Text>Cart is empty.</Text>
				)}

				<Text pt={6} fontSize='3xl' fontWeight='900'>
					Total : {total.toLocaleString(undefined, currencyOptions)}€
				</Text>
			</Flex>
		</SimpleGrid>
	)
}
