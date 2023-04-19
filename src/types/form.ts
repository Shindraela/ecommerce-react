export type PaymentFormType = {
	formName: string
	fileName?: string
	fieldName: string
	value: object
}

export default interface IForm1 {
	firstName: string
	lastName: string
	phone: string
}

export default interface IForm2 {
	fullName: string
	address: string
	selectedCountry: string
	city: string
}

export default interface IForm3 {
	cardName: string
	cardNumber: string
	expiryDate: string
	cvv: string
}
