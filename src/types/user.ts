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

export type UserResponseType = {
	data: IUser
	status: number
	access_token?: string
	refresh_token?: string
}

export type UserContextType = {
	login: (username: string, password: string) => Promise<UserResponseType>
	fetchProfile: (access_token: string) => Promise<UserResponseType>
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
	updateUser: (currentUser: IUser) => Promise<UserResponseType>
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
