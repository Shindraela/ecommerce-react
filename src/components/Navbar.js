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
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import CartContext from '../contexts/CartContext';
import { SearchBar } from './SearchBar';
import { URLS } from '../constants';

const Links = [
  {
    id: 1,
    name: 'Produits',
    href: '/'
  },
  {
    id: 2,
    name: 'Mon panier',
    href: '/cart'
  }
];

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
	const { isAuthenticated, currentUser, logout } = useContext(UserContext)
	const { getCounter } = useContext(CartContext)
	const count = getCounter()

  return (
		<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
			<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
				<IconButton
					size={'md'}
					icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
					aria-label={'Open Menu'}
					display={{ md: 'none' }}
					onClick={isOpen ? onClose : onOpen}
				/>

				<HStack spacing={8} alignItems={'center'}>
					<Box>Logo</Box>
					<HStack
						as={'nav'}
						spacing={4}
						display={{ base: 'none', md: 'flex' }}>
						{Links.map(link => (
							<Link key={link.name} to={link.href}>
								{link.name}
							</Link>
						))}
					</HStack>

					<Badge ml='1' fontSize='0.8em' colorScheme='green'>
						{count}
					</Badge>
				</HStack>

				<Flex alignItems={'center'}>
					{isAuthenticated && currentUser ?
						<Menu>
							<SearchBar />
							<MenuButton
								as={Button}
								rounded={'full'}
								variant={'link'}
								cursor={'pointer'}
								minW={0}>
								<Avatar
									size={'sm'}
									src={currentUser.avatar}
								/>
							</MenuButton>

							<MenuList>
								<MenuItem>{currentUser.name}</MenuItem>
								<MenuDivider />
								<MenuItem onClick={logout}>Déconnexion</MenuItem>
							</MenuList>
						</Menu>
						:
						<Menu>
							<SearchBar />

							<Stack
								flex={{ base: 1, md: 0 }}
								justify={'flex-end'}
								direction={'row'}
								spacing={6}
							>
								<Button
									fontSize={'sm'}
									fontWeight={400}
									variant={'link'}
								>
									<Link to={URLS.SIGNUP}>
										Sign Up
									</Link>
								</Button>

								<Button
									display={{ base: 'none', md: 'inline-flex' }}
									fontSize={'sm'}
									fontWeight={600}
									color={'white'}
									bg={'pink.400'}
									_hover={{
										bg: 'pink.300',
									}}
								>
									<Link to={URLS.LOGIN}>
										Log In
									</Link>
								</Button>
							</Stack>
						</Menu>
					}
				</Flex>
			</Flex>

			{isOpen ? (
				<Box pb={4} display={{ md: 'none' }}>
					<Stack as={'nav'} spacing={4}>
						{Links.map(link => (
							<Link key={link.name} to={link.href}>
								{link.name}
							</Link>
						))}
					</Stack>
				</Box>
			) : null}
		</Box>
  );
}
