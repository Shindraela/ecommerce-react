export type IOrder = {
	id: string
	reference: string
	customer: string
	order_date: string
	delivery_status: string
	cost: string
}

export default interface IProfile {
	id: string
	name: string
	email: string
	address: string
	country: string
	city: string
	postcode: string
	birth_date: string
	phone_number: string
	orders: IOrder[]
}
