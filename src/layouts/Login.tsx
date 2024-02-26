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
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import { URLS } from '../constants'
import storageService from '../services/storage.service'

export const Login = () => {
	const nav = useNavigate()
	const { login, fetchProfile, setCurrentUser } = useContext(UserContext)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState(false)

	const onSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault()

		login(username, password)
			.then(({ data }) => {
				if (data.access_token) {
					storageService.add('access_token', data.access_token)
					storageService.add('refresh_token', data.refresh_token)
				}
			})
			.then(() => {
				const accessToken = storageService.get('access_token') as string

				fetchProfile(accessToken).then(({ data, status }) => {
					if (status === 200) {
						setCurrentUser(data)
						nav(URLS.HOMEPAGE)
					}
				})
			})
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
						<FormControl id='username'>
							<FormLabel>Username</FormLabel>
							<Input type='username' value={username} onChange={e => setUsername(e.target.value)} />
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
								Wrong combination username/password
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
