import { Flex, Stack, Heading, Text } from '@chakra-ui/react'
import { RepeatIcon, CheckCircleIcon } from '@chakra-ui/icons'
import { IOrder } from '../../types/profile'

type IOrderProps = {
	order: IOrder
}

export const OrderCard = ({ order }: IOrderProps) => {
	return (
		<Flex
			flex={1}
			p={4}
			my={4}
			borderWidth='1px'
			borderRadius='lg'
			w={{ sm: '100%', md: '50%' }}
			boxShadow='1xl'
			direction={{ base: 'column', sm: 'row' }}
			justify='space-between'
			align='flex-start'
		>
			<Stack flex={1} direction='column' justify='flex-start' align='flex-start'>
				<Stack direction='column' justify='flex-start' align='flex-start' p={1} pt={2}>
					<Heading fontSize='lg' fontFamily='body'>
						{order.customer}
					</Heading>

					<Text textAlign='center'>{order.order_date}</Text>
				</Stack>

				<Stack width='100%' mt='2rem' direction='row' padding={2} align='center'>
					<Text>{order.delivery_status}</Text>
					{order.delivery_status === 'shipped' ? (
						<CheckCircleIcon color='green' />
					) : order.delivery_status === 'delivered' ? (
						<RepeatIcon />
					) : null}
				</Stack>
			</Stack>

			<Stack direction='column' justify='flex-start' align='flex-start' p={1} pt={2}>
				<Heading fontSize='lg' fontFamily='body'>
					{order.cost}€
				</Heading>

				<Text textAlign='center'>{order.reference}</Text>
			</Stack>
		</Flex>
	)
}
