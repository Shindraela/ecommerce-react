export default interface ICategory {
	_id: string
	name: string
	image?: string
	creationAt?: string
	updatedAt?: string
}

export type CategoriesResponseType = {
	data: ICategory[]
	status: number
}

export type CategoriesContextType = {
	categories: ICategory[]
	setCategories: (categories: ICategory[]) => void
}
