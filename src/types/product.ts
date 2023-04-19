import ICategory from '../types/category'

export default interface IProduct {
	id: number
	title: string
	price: number
	description: string
	category: {
		name: string
	}
	quantity: number
	images: string[]
}

export type ProductImages = {
	images: IProduct['images']
}

export type ProductsContextType = {
	allProducts: IProduct[]
	categories: ICategory[]
	setAllProducts: (allProducts: IProduct[]) => void
}
