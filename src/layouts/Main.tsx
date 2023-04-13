import { Outlet } from 'react-router'
import { Navbar } from '../components/Navbar'
import { CartProvider } from '../contexts/CartContext'
import { ProductsProvider } from '../contexts/ProductsContext'

export const Main = () => {
	return (
		<ProductsProvider>
			<CartProvider>
				<Navbar />
				<Outlet />
			</CartProvider>
		</ProductsProvider>
	)
}
