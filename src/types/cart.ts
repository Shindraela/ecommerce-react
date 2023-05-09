type CartType = {
	productId: number
	quantity: number
	price: number
}

export type CartProductType = {
	id: number
	title: string
	image: string
	quantity: number
	cost: number
}

export default interface ICart {
	[key: string]: CartType
}

export type CartContextType = {
	cart: ICart
	setCart: (cart: ICart) => void
	add: (productId: number) => Promise<void>
	decrease: (productId: number) => void
	getCounter: () => number
	getTotal: () => number
}
