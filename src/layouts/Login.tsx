import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import { URLS } from '../constants'

export const Login = () => {
	const { fetchToken } = useContext(UserContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState(false)

	const onSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		const body = { email, password }

		try {
			await fetchToken(body).then(response => {
				if (response && response.statusCode === 401) {
					setError(true)
				} else {
					return
				}
			})
		} catch (error) {
			console.error('error', error)
		}
	}

	return (
		<Flex
			minH='100vh'
			align='center'
			justify='center'
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
				<Stack align='center'>
					<Heading fontSize='4xl'>Login to your account</Heading>
					<Text fontSize='lg' color='gray.600'>
						to enjoy all of our cool products ✌️
					</Text>
				</Stack>

				<Box rounded='lg' bg={useColorModeValue('white', 'gray.700')} boxShadow='lg' p={8}>
					<Stack spacing={4}>
						<FormControl id='email'>
							<FormLabel>Email</FormLabel>
							<Input type='email' value={email} onChange={e => setEmail(e.target.value)} />
						</FormControl>

						<FormControl id='password'>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
								<InputRightElement h='full'>
									<Button
										variant='ghost'
										onClick={() => setShowPassword(showPassword => !showPassword)}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						{error ? (
							<Text fontSize='sm' color='red'>
								Wrong combination email/password
							</Text>
						) : null}

						<Stack spacing={10}>
							<Stack
								flex={{ base: 1, md: 0 }}
								justify='space-between'
								align='flex-start'
								direction={{ base: 'column', sm: 'row' }}
								spacing={6}
							>
								<Text align='center' fontSize='sm'>
									New? <Link to={URLS.SIGNUP}>Sign Up</Link>
								</Text>

								<Link to={URLS.HOMEPAGE}>Go Home</Link>
							</Stack>

							<Button
								bg='blue.400'
								color='white'
								_hover={{
									bg: 'blue.500',
								}}
								onClick={onSubmit}
							>
								Login
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	)
}
