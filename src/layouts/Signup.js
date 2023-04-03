import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { URLS } from '../constants';

export const Signup = () => {
	const { createUser } = useContext(UserContext)
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [avatar, setAvatar] = useState('')
	const [error, setError] = useState(false)
	const [errorMessages, setErrorMessages] = useState([])
	const [showPassword, setShowPassword] = useState(false)
	const nav = useNavigate()

	const onSubmit = async (e) => {
		e.preventDefault()
		const body = { name, email, password, avatar }

		try {
			await createUser(body)
				.then(response => {
					if (response && response.statusCode === 400) {
						setError(true)
						setErrorMessages([...response.message])
					} else {
						nav(URLS.LOGIN)
					}
				})
		} catch (error) {
			console.error('error', error)
		}
	}

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}>

      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
				</Stack>

        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id='name' isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type='text' value={name} onChange={e => setName(e.target.value)} />
                </FormControl>
							</Box>

              <Box>
								<FormControl id='email' isRequired>
									<FormLabel>Email address</FormLabel>
									<Input type='email' value={email} onChange={e => setEmail(e.target.value)} />
								</FormControl>
              </Box>
						</HStack>

						<FormControl id='avatar' isRequired>
							<FormLabel>Avatar</FormLabel>
							<Input type='text' value={avatar} onChange={e => setAvatar(e.target.value)} />
						</FormControl>

            <FormControl id='password' isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
						{error ?
							<Box>
								{errorMessages.map((msg, index) => (
									<Text fontSize='sm' color='red' key={index}>{msg}</Text>
								))}
							</Box>
							:
							null
						}

            <Stack spacing={10} pt={2}>
              <Button
                loadingText='Submitting'
                size='lg'
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
								}}
								onClick={onSubmit}
							>
                Sign up
              </Button>
						</Stack>

            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link to={URLS.LOGIN}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
