import { createContext, useState } from 'react'
import { API_BASE_URL } from '../constants'
import ChildrenProps from '../types/children'
import ICart, { CartContextType } from '../types/cart'
import IProduct from '../types/product'
import { requests } from '../services/api.requests'

const CartContext = createContext<CartContextType>({} as CartContextType)

type ProductResponseType = {
	data: IProduct
	status: number
}

export const CartProvider = ({ children }: ChildrenProps) => {
	const [cart, setCart] = useState<ICart>({})

	const getProductById = (productId: string): Promise<ProductResponseType> =>
		requests.get(`${API_BASE_URL}/products/${productId}`)

	const add = async (productId: string) => {
		if (cart[productId]) {
			cart[productId].quantity += 1
		} else {
			const { data } = await getProductById(productId)

			cart[productId] = {
				productId: data._id,
				quantity: 1,
				price: data.price,
			}
		}

		setCart({ ...cart })
	}

	const decrease = (productId: string) => {
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
		return Object.entries(cart).reduce<number>((acc, [productId, product]) => {
			return acc + product.price * product.quantity
		}, 0)
	}

	return (
		<CartContext.Provider
			value={{
				cart,
				setCart,
				getCounter,
				getTotal,
				add,
				decrease,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export default CartContext
