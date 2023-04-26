import { Heading, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { AllFormsType } from '../../types/form'

type Form3Props = {
	formData: AllFormsType['form3']
	onChange: (fieldName: string, value: string) => void
}

export const Form3 = ({ formData, onChange }: Form3Props) => {
	return (
		<Flex direction='column' p={6} pb={2}>
			<Heading w='100%' size='md' fontWeight='bold' mb='2%'>
				Payment details
			</Heading>

			<Flex>
				<FormControl mr='5%' isRequired>
					<FormLabel htmlFor='cardName' fontWeight='normal'>
						Name On Card
					</FormLabel>

					<Input
						type='text'
						id='cardName'
						name='cardName'
						onChange={e => onChange(e.target.name, e.target.value)}
						value={formData.cardName}
					/>
				</FormControl>

				<FormControl isRequired>
					<FormLabel htmlFor='cardNumber' fontWeight='normal'>
						Card Number
					</FormLabel>

					<Input
						type='text'
						id='cardNumber'
						name='cardNumber'
						value={formData.cardNumber}
						onChange={e => onChange(e.target.name, e.target.value)}
					/>
				</FormControl>
			</Flex>

			<Flex mt='2%'>
				<FormControl mr='5%' isRequired>
					<FormLabel htmlFor='expiryDate' fontWeight='normal'>
						Expiry Date
					</FormLabel>

					<Input
						type='date'
						id='expiryDate'
						name='expiryDate'
						value={formData.expiryDate}
						onChange={e => onChange(e.target.name, e.target.value)}
					/>
				</FormControl>

				<FormControl isRequired>
					<FormLabel htmlFor='cvv' fontWeight='normal'>
						CVV
					</FormLabel>

					<Input
						type='text'
						id='cvv'
						name='cvv'
						value={formData.cvv}
						onChange={e => onChange(e.target.name, e.target.value)}
					/>
				</FormControl>
			</Flex>
		</Flex>
	)
}
