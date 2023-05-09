export type IForm1 = {
	firstName: string
	lastName: string
	phone: string
}

export type IForm2 = {
	fullName: string
	address: string
	selectedCountry: string
	city: string
}

export type IForm3 = {
	cardName: string
	cardNumber: string
	expiryDate: string
	cvv: string
}

export type AllFormsType = {
	form1: IForm1
	form2: IForm2
	form3: IForm3
}
