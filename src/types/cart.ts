type CartType = {
	productId: number | string
	quantity: number
	price: number
}

export type CartProductType = {
	_id: string
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
	add: (productId: string) => Promise<void>
	decrease: (productId: string) => void
	getCounter: () => number
	getTotal: () => number
}
