import {
	Box,
	Flex,
	Avatar,
	HStack,
	IconButton,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	Stack,
	Badge,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import CartContext from '../contexts/CartContext'
import { SearchBar } from './SearchBar'
import { URLS } from '../constants'
import storageService from '../services/storage.service'

const Links = [
	{
		id: 1,
		name: 'Products',
		href: '/',
	},
	{
		id: 2,
		name: 'Cart',
		href: '/cart',
	},
]

export const Navbar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { getToken, setAccessToken, setRefreshToken, currentUser, setCurrentUser } =
		useContext(UserContext)
	const { getCounter } = useContext(CartContext)
	const count = getCounter()
	const nav = useNavigate()

	const logout = () => {
		storageService.remove('access_token')
		setAccessToken(undefined)
		setRefreshToken(undefined)
		setCurrentUser(null)
		nav(URLS.HOMEPAGE)
	}

	return (
		<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
			<Flex h={16} align='center' justify='space-between'>
				<IconButton
					size='md'
					icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
					aria-label='Open Menu'
					display={{ md: 'none' }}
					onClick={isOpen ? onClose : onOpen}
				/>

				<HStack spacing={8} align='center'>
					<Box>Logo</Box>
					<HStack as='nav' spacing={4} display={{ base: 'none', md: 'flex' }}>
						{Links.map(link => (
							<Link key={link.id} to={link.href}>
								{link.name}
							</Link>
						))}
					</HStack>

					<Badge ml='1' fontSize='0.8em' colorScheme='green'>
						{count}
					</Badge>
				</HStack>

				<Flex align='center'>
					{getToken('access_token') && currentUser ? (
						<Menu>
							<SearchBar />
							<MenuButton as={Button} rounded='full' variant='link' cursor='pointer' minW={0}>
								<Avatar size='sm' src={currentUser.avatar} />
							</MenuButton>

							<MenuList>
								<MenuItem>
									<Link to={URLS.PROFILE}>My Account</Link>
								</MenuItem>
								<MenuDivider />
								<MenuItem onClick={logout}>Logout</MenuItem>
							</MenuList>
						</Menu>
					) : (
						<Menu>
							<SearchBar />

							<Stack flex={{ base: 1, md: 0 }} justify='flex-end' direction='row' spacing={6}>
								<Button fontSize='sm' fontWeight={400} variant='link'>
									<Link to={URLS.SIGNUP}>Sign Up</Link>
								</Button>

								<Button
									display={{ base: 'none', md: 'inline-flex' }}
									fontSize='sm'
									fontWeight={600}
									color='white'
									bg='pink.400'
									_hover={{
										bg: 'pink.300',
									}}
								>
									<Link to={URLS.LOGIN}>Log In</Link>
								</Button>
							</Stack>
						</Menu>
					)}
				</Flex>
			</Flex>

			{isOpen ? (
				<Box pb={4} display={{ md: 'none' }}>
					<Stack as='nav' spacing={4}>
						{Links.map(link => (
							<Link key={link.id} to={link.href}>
								{link.name}
							</Link>
						))}
					</Stack>
				</Box>
			) : null}
		</Box>
	)
}
