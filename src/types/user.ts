import IToken from './token'
import { handleStorage } from '../handleStorage'

export default interface IUser {
	id: number
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
	setToken: React.Dispatch<React.SetStateAction<IToken | null>>
	getToken: () => any
	token: IToken | null
	storage: handleStorage
	createUser: (body: any) => Promise<any>
	currentUser: IUser | null
	setCurrentUser: (currentUser: IUser | null) => void
	logout: () => void
}
