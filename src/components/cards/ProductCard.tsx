import {
	Card,
	CardBody,
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
import IProduct from '../../types/product'

type productProps = {
	product: IProduct
}

export const ProductCard = ({ product }: productProps) => {
	const { add } = useContext(CartContext)
	const toast = useToast()

	const addProduct = () => {
		add(product._id)

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
				<img
					src={product.images[0]}
					alt={product.title}
					style={{
						width: '100%',
						height: 'auto',
						objectFit: 'contain',
						objectPosition: 'center',
						aspectRatio: '1',
					}}
				/>
				<Stack mt='6' spacing='3'>
					<Heading size='md'>
						<Link to={`${URLS.PRODUCTS}/${product._id}`} relative='path'>
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
