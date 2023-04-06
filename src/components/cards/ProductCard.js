import {
	Card,
	CardBody,
	Image,
	Stack,
	Heading,
	Text,
	Divider,
	CardFooter,
	ButtonGroup,
	Button,
	useToast,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import CartContext from '../../contexts/CartContext'
import { URLS } from '../../constants'

export const ProductCard = ({ product }) => {
	const { add } = useContext(CartContext)
	const toast = useToast()

	const addProduct = () => {
		add(product.id)
		toast({
			title: 'Product added.',
			description: 'Product was added to your cart!',
			status: 'success',
			duration: 3000,
			isClosable: true,
		})
	}

	return (
		<Card size='lg' variant='outline'>
			<CardBody>
				<Image
					src={product.images[0]}
					alt={product.title}
					borderRadius='lg'
					objectFit='contain'
					align='center'
				/>
				<Stack mt='6' spacing='3'>
					<Heading size='md'>
						<Link to={`${URLS.PRODUCTS}/${product.id}`} relative='path'>
							{product.title}
						</Link>
					</Heading>
					<Text>{product.description}</Text>
					<Text color='blue.600' fontSize='2xl'>
						{product.price}€
					</Text>
				</Stack>
			</CardBody>

			<Divider />

			<CardFooter>
				<ButtonGroup spacing='2'>
					<Button variant='solid' colorScheme='blue' onClick={addProduct}>
						Add to cart
					</Button>
				</ButtonGroup>
			</CardFooter>
		</Card>
	)
}
