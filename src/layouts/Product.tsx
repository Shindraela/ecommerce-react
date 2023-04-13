import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
	Box,
	Container,
	Stack,
	Text,
	Heading,
	SimpleGrid,
	Button,
	Flex,
	Image,
	VStack,
	Badge,
	AbsoluteCenter,
	Spinner,
	useToast,
} from '@chakra-ui/react'
import CartContext from '../contexts/CartContext'
import { REACT_APP_API_BASE_URL } from '../constants'
import { ProductCarousel } from '../components/ProductCarousel'
import IProduct from '../types/product'

export const Product = () => {
	const toast = useToast()
	const params = useParams()
	const nav = useNavigate()
	const { add } = useContext(CartContext)
	const [product, setProduct] = useState<IProduct>({
		id: 1,
		title: 'random',
		price: 2,
		description: 'random',
		category: {
			name: 'random',
		},
		quantity: 2,
		images: [],
	})

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch(`${REACT_APP_API_BASE_URL}/products/${params.id}`)
				const json = await response.json()

				setProduct(json)
			} catch (error) {
				console.error(error)
			}
		}

		fetchProduct()
	}, [params.id])

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

	if (product === undefined) {
		return (
			<Box position='relative' h='100vh'>
				<AbsoluteCenter axis='both'>
					<Spinner size='xl' />
				</AbsoluteCenter>
			</Box>
		)
	} else {
		return (
			<Container maxW='7xl'>
				<Button
					mt={8}
					size='lg'
					colorScheme='teal'
					variant='outline'
					_hover={{
						transform: 'translateY(2px)',
						boxShadow: 'lg',
					}}
					onClick={() => nav(-1)}
				>
					Go back
				</Button>

				<SimpleGrid
					columns={{ base: 1, lg: 2 }}
					spacing={{ base: 8, md: 10 }}
					py={{ base: 18, md: 24 }}
				>
					<Flex>
						{product.images && product.images.length > 1 ? (
							<ProductCarousel images={product.images} />
						) : (
							<Image
								rounded='md'
								alt={product.title}
								src={product.images[0]}
								fit='contain'
								align='center'
								w='100%'
								h={{ base: '100%', sm: '400px', lg: '500px' }}
							/>
						)}
					</Flex>

					<Stack spacing={{ base: 6, md: 10 }}>
						<Box as='header'>
							<Heading
								lineHeight={1.1}
								fontWeight={600}
								fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
							>
								{product.title}
							</Heading>
							<Text fontWeight={300} fontSize='2xl'>
								{product.price}€
							</Text>
						</Box>

						<Stack spacing={{ base: 4, sm: 6 }} direction='column'>
							<VStack spacing={{ base: 4, sm: 6 }}>
								<Badge ml='1' fontSize='0.8em' colorScheme='green'>
									{product.category.name}
								</Badge>
								<Text fontSize='lg'>{product.description}</Text>
							</VStack>
						</Stack>

						<Button
							rounded='none'
							w='full'
							mt={8}
							size='lg'
							py='7'
							textTransform='uppercase'
							_hover={{
								transform: 'translateY(2px)',
								boxShadow: 'lg',
							}}
							onClick={addProduct}
						>
							Add to cart
						</Button>
					</Stack>
				</SimpleGrid>
			</Container>
		)
	}
}
