import IToken, { TokenType } from './token'

export default interface IUser {
	_id: string
	username: string
	email: string
	password?: string
	name?: string
	role?: string
	avatar?: string
	creationAt?: string
	updatedAt?: string
	access_token?: string
	refresh_token?: string
}

export type ResponseType = {
	data: IUser
	status: number
	access_token?: string
	refresh_token?: string
}

export type UserContextType = {
	login: (username: string, password: string) => Promise<ResponseType>
	fetchProfile: (access_token: string) => Promise<ResponseType>
	access_token: IToken | undefined
	refresh_token: IToken | undefined
	setAccessToken: React.Dispatch<React.SetStateAction<IToken | undefined>>
	setRefreshToken: React.Dispatch<React.SetStateAction<IToken | undefined>>
	getToken: (tokenName: string) => any
	hasToken: boolean
	setHasToken: (hasToken: boolean) => void
	createUser: (body: any) => Promise<any>
	currentUser: IUser
	setCurrentUser: (currentUser: IUser) => void
	updateUser: (currentUser: IUser) => Promise<ResponseType>
	logout: () => void
}

export const defaultUserState = {
	_id: '',
	username: '',
	email: '',
	password: '',
	name: '',
	role: '',
	avatar: '',
	creationAt: '',
	updatedAt: '',
}
