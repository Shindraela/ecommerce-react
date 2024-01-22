import IToken from './token'

export default interface IUser {
	_id: string
	username: string
	email: string
	password: string
	name: string
	role?: string
	avatar?: string
	creationAt?: string
	updatedAt?: string
}

export type UserContextType = {
	fetchToken: (body: any) => Promise<any>
	access_token: IToken | undefined
	refresh_token: IToken | undefined
	setAccessToken: React.Dispatch<React.SetStateAction<IToken | undefined>>
	setRefreshToken: React.Dispatch<React.SetStateAction<IToken | undefined>>
	getToken: (tokenName: string) => any
	hasToken: boolean
	setHasToken: (hasToken: boolean) => void
	createUser: (body: any) => Promise<any>
	currentUser: IUser | null
	setCurrentUser: (currentUser: IUser | null) => void
	logout: () => void
}
