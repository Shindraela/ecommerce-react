import { Text, Box, Heading, Flex, Center, Stack } from '@chakra-ui/react'
import { maskedNumber } from '../../utils'

export const Form4 = ({ formData }) => {
	return (
		<Flex direction='column' p={6} pb={2}>
			<Heading w='100%' size='md' fontWeight='bold' mb='2%'>
				Order Summary
			</Heading>

			<Center>
				<Stack flex={1} direction='row' justify='space-between' align='flex-start' pt={2}>
					<Box>
						<Heading w='100%' size='md' fontWeight='bold' mb='2%'>
							Customer
						</Heading>

						<Text>{formData.form1.firstName}</Text>
						<Text>{formData.form1.lastName}</Text>
						<Text>{formData.form1.phone}</Text>
					</Box>

					<Box>
						<Heading w='100%' size='md' fontWeight='bold' mb='2%'>
							Shipping address
						</Heading>

						<Text>{formData.form2.fullName}</Text>
						<Text>{formData.form2.address}</Text>
						<Text>{formData.form2.selectedCountry}</Text>
						<Text>{formData.form2.city}</Text>
					</Box>

					<Box>
						<Heading w='100%' size='md' fontWeight='bold' mb='2%'>
							Payment details
						</Heading>

						<Text>{formData.form3.cardName}</Text>
						<Text>{maskedNumber(formData.form3.cardNumber)}</Text>
						<Text>{formData.form3.expiryDate}</Text>
						<Text>{formData.form3.cvv}</Text>
					</Box>
				</Stack>
			</Center>
		</Flex>
	)
}
