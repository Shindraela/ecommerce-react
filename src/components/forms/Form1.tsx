import { Heading, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'

export const Form1 = ({ formData, onChange }) => {
	return (
		<Flex direction='column' p={6} pb={0}>
			<Heading w='100%' size='md' fontWeight='bold' mb='2%'>
				Customer
			</Heading>

			<Flex>
				<FormControl isRequired mr='5%'>
					<FormLabel htmlFor='firstName' fontWeight='normal'>
						First name
					</FormLabel>

					<Input
						type='text'
						id='firstName'
						name='firstName'
						value={formData.firstName}
						onChange={e => onChange(e.target.name, e.target.value)}
					/>
				</FormControl>

				<FormControl isRequired>
					<FormLabel htmlFor='lastName' fontWeight='normal'>
						Last name
					</FormLabel>

					<Input
						type='text'
						id='lastName'
						name='lastName'
						value={formData.lastName}
						onChange={e => onChange(e.target.name, e.target.value)}
					/>
				</FormControl>
			</Flex>

			<Flex mt='2%'>
				<FormControl>
					<FormLabel htmlFor='tel' fontWeight='normal'>
						Phone number
					</FormLabel>

					<Input
						id='tel'
						type='tel'
						name='phone'
						value={formData.phone}
						onChange={e => onChange(e.target.name, e.target.value)}
					/>
				</FormControl>
			</Flex>
		</Flex>
	)
}
