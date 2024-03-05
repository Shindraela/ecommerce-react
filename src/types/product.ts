import ICategory from '../types/category'

export default interface IProduct {
	_id: string
	title: string
	price: number
	description: string
	category: {
		name: string
	}
	quantity: number
	images: string[]
}

export type ProductsResponseType = {
	data: IProduct[]
	status: number
}

export type ProductsContextType = {
	products: IProduct[]
	setProducts: (products: IProduct[]) => void
}
