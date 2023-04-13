import { Route, Routes } from 'react-router'
import { ChakraProvider } from '@chakra-ui/react'
import { Main } from './layouts/Main'
import { Cart } from './layouts/Cart'
import { ProductsList } from './layouts/ProductsList'
import { Product } from './layouts/Product'
import { Auth } from './layouts/Auth'
import { Login } from './layouts/Login'
import { Signup } from './layouts/Signup'
import { UserProvider } from './contexts/UserContext'
import { Profile } from './layouts/Profile'

function App() {
	return (
		<ChakraProvider>
			<UserProvider>
				<Routes>
					<Route path='' element={<Auth />}>
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
					</Route>

					<Route path='/' element={<Main />}>
						<Route index element={<ProductsList />} />
						<Route path='/products/:id' element={<Product />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='/profile' element={<Profile />} />
					</Route>
				</Routes>
			</UserProvider>
		</ChakraProvider>
	)
}

export default App
