export type PaymentFormType = {
	[key: string]: any
}

export type IForm1 = {
	form1: {
		firstName: string
		lastName: string
		phone: string
	}
}

export type IForm2 = {
	form2: {
		fullName: string
		address: string
		selectedCountry: string
		city: string
	}
}

export type IForm3 = {
	form3: {
		cardName: string
		cardNumber: string
		expiryDate: string
		cvv: string
	}
}

export type AllFormsType = IForm1 & IForm2 & IForm3
