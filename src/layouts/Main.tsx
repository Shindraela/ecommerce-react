import { Outlet } from 'react-router'
import { Navbar } from '../components/Navbar'
import { CartProvider } from '../contexts/CartContext'
import { CategoriesProvider } from '../contexts/CategoriesContext'
import { ProductsProvider } from '../contexts/ProductsContext'

export const Main = () => {
	return (
		<ProductsProvider>
			<CategoriesProvider>
				<CartProvider>
					<Navbar />
					<Outlet />
				</CartProvider>
			</CategoriesProvider>
		</ProductsProvider>
	)
}
