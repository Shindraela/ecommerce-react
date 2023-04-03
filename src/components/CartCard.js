import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useContext } from 'react';
import CartContext from '../contexts/CartContext';

export const CartCard = ({ product }) => {
	const { add, decrease } = useContext(CartContext)

	return (
		<Center p={4} key={product.id}>
			<Flex flex={1}>
				<Image
					objectFit='contain'
					boxSize='100%'
					src={product.image}
				/>
			</Flex>

			<Stack
				flex={1}
				flexDirection='column'
				justifyContent='flex-start'
				alignItems='flex-start'
				p={1}
				pt={2}
				pl={2}
			>
				<Stack
					flex={1}
					flexDirection='column'
					justifyContent='flex-start'
					alignItems='flex-start'
					p={1}
					pt={2}
				>
					<Heading fontSize={'lg'} fontFamily={'body'}>
						{product.title}
					</Heading>

					<Text textAlign={'center'}>
						{product.cost}€
					</Text>
				</Stack>

				<Stack
					width={'100%'}
					mt={'2rem'}
					direction={'row'}
					padding={2}
					justifyContent={'space-between'}
					alignItems={'center'}
				>
					<Button
						flex={1}
						fontSize={'sm'}
						rounded={'full'}
						_focus={{
							bg: 'gray.200',
						}}
						onClick={() => decrease(product.id)}
					>
						-
					</Button>

					<Text>{product.quantity}</Text>

					<Button
						flex={1}
						fontSize={'sm'}
						rounded={'full'}
						bg={'blue.400'}
						color={'white'}
						boxShadow={
							'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
						}
						_hover={{
							bg: 'blue.500',
						}}
						_focus={{
							bg: 'blue.500',
						}}
						onClick={() => add(product.id)}
					>
						+
					</Button>
				</Stack>
			</Stack>
		</Center>
	)
}
