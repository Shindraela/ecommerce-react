import { createContext, useContext, useState } from 'react'
import ProductsContext from './ProductsContext'
import { REACT_APP_API_BASE_URL } from '../constants'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState({})
	const { allProducts } = useContext(ProductsContext)

	const add = async productId => {
		if (cart[productId]) {
			cart[productId].quantity += 1
		} else {
			const response = await fetch(
				`${REACT_APP_API_BASE_URL}/products/${productId}`,
			)
			const json = await response.json()

			cart[productId] = {
				productId: json.id,
				quantity: 1,
			}
		}

		setCart({ ...cart })
	}

	const decrease = productId => {
		if (!cart[productId]) {
			return
		}

		cart[productId].quantity -= 1

		if (cart[productId].quantity === 0) {
			delete cart[productId]
		}

		setCart({ ...cart })
	}

	const getCounter = () => {
		return Object.keys(cart).reduce((acc, id) => {
			return acc + cart[id].quantity
		}, 0)
	}

	const getTotal = () => {
		return Object.keys(cart).reduce((acc, id) => {
			return acc + allProducts[id].price * cart[id].quantity
		}, 0)
	}

	return (
		<CartContext.Provider
			value={{ cart, setCart, getCounter, getTotal, add, decrease }}
		>
			{children}
		</CartContext.Provider>
	)
}

export default CartContext
