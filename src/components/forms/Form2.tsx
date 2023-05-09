import { Heading, Flex, FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import countries from '../../countries.json'
import { IForm2 } from '../../types/form'

type Form2Props = {
	formData: IForm2
	onChange: (fieldName: string, value: string) => void
}

export const Form2 = ({ formData, onChange }: Form2Props) => {
	return (
		<Flex direction='column' p={6} pb={2}>
			<Heading w='100%' size='md' fontWeight='bold' mb='2%'>
				Shipping address
			</Heading>

			<Flex>
				<FormControl mr='5%' isRequired>
					<FormLabel htmlFor='fullName' fontWeight='normal'>
						Full name
					</FormLabel>

					<Input
						type='text'
						id='fullName'
						name='fullName'
						onChange={e => onChange(e.target.name, e.target.value)}
						value={formData.fullName}
					/>
				</FormControl>

				<FormControl isRequired>
					<FormLabel htmlFor='address' fontWeight='normal'>
						Address
					</FormLabel>

					<Input
						id='address'
						type='text'
						value={formData.address}
						name='address'
						onChange={e => onChange(e.target.name, e.target.value)}
					/>
				</FormControl>
			</Flex>

			<Flex mt='2%'>
				<FormControl isRequired mr='5%'>
					<FormLabel>Country</FormLabel>

					<Select
						name='country'
						onChange={e => onChange(e.target.name, e.target.value)}
						placeholder='Select country'
					>
						{countries.map(country => (
							<option key={country.code} value={formData.selectedCountry}>
								{country.name}
							</option>
						))}
					</Select>
				</FormControl>

				<FormControl isRequired>
					<FormLabel htmlFor='city' fontWeight='normal'>
						City
					</FormLabel>

					<Input
						type='text'
						id='city'
						name='city'
						value={formData.city}
						onChange={e => onChange(e.target.name, e.target.value)}
					/>
				</FormControl>
			</Flex>
		</Flex>
	)
}
