import { ProductsResponseType } from './product'

export default interface ICategory {
	_id: string
	name: string
	common: string
}

export type CategoriesResponseType = {
	data: ICategory[]
	status: number
}

export type CategoriesContextType = {
	categories: ICategory[]
	setCategories: (categories: ICategory[]) => void
	getProductsByCategory: (categoryName: string) => Promise<ProductsResponseType>
}
