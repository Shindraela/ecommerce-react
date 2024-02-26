import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { API_BASE_URL, URLS } from '../constants'
import storageService from '../services/storage.service'
import ChildrenProps from '../types/children'
import IToken from '../types/token'
import IUser, { defaultUserState, ResponseType, UserContextType } from '../types/user'
import { requests } from '../services/api.requests'

const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: ChildrenProps) => {
	const [access_token, setAccessToken] = useState<IToken | undefined>(undefined)
	const [refresh_token, setRefreshToken] = useState<IToken | undefined>(undefined)
	const [hasToken, setHasToken] = useState(false)
	const [currentUser, setCurrentUser] = useState<IUser>(defaultUserState)
	const nav = useNavigate()

	const createUser = (body: IUser): Promise<ResponseType> =>
		requests.post(`${API_BASE_URL}/auth/signup`, body)

	const updateUser = (body: IUser): Promise<ResponseType> =>
		requests.put(`${API_BASE_URL}/users/${body._id}`, body)

	const fetchProfile = (tokenValue: string): Promise<ResponseType> =>
		requests.get(`${API_BASE_URL}/auth/profile`, {
			headers: {
				Authorization: `Bearer ${tokenValue}`,
			},
		})

	const login = (username: string, password: string): Promise<ResponseType> =>
		requests.post(`${API_BASE_URL}/auth/login`, { username, password })

	const getToken = (tokenName: string) => storageService.get(tokenName)

	useEffect(() => {
		const checkLoggedIn = async () => {
			setHasToken(false)
			const access_token = storageService.get('access_token') as string
			const refresh_token = storageService.get('refresh_token') as string

			if (!access_token && !refresh_token) return
			const profile = await fetchProfile(access_token)
			return profile
		}

		checkLoggedIn()
	}, [hasToken])

	const logout = () => {
		storageService.remove('access_token')
		storageService.remove('refresh_token')
		setAccessToken(undefined)
		setRefreshToken(undefined)
		setHasToken(false)
		setCurrentUser(defaultUserState)
		nav(URLS.HOMEPAGE)
	}

	return (
		<UserContext.Provider
			value={{
				createUser,
				access_token,
				refresh_token,
				login,
				fetchProfile,
				setAccessToken,
				setRefreshToken,
				hasToken,
				setHasToken,
				getToken,
				currentUser,
				setCurrentUser,
				logout,
				updateUser,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
