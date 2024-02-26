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

export type ProductsContextType = {
	allProducts: IProduct[]
	categories: ICategory[]
	setAllProducts: (allProducts: IProduct[]) => void
}
