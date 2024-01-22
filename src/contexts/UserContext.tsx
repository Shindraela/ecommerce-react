import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { API_BASE_URL, HTTP_HEADERS, URLS } from '../constants'
import storageService from '../services/storage.service'
import ChildrenProps from '../types/children'
import IToken from '../types/token'
import IUser, { UserContextType } from '../types/user'
import instance from '../services/api'

const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: ChildrenProps) => {
	const [access_token, setAccessToken] = useState<IToken | undefined>(undefined)
	const [refresh_token, setRefreshToken] = useState<IToken | undefined>(undefined)
	const [hasToken, setHasToken] = useState(false)
	const [currentUser, setCurrentUser] = useState<IUser | null>(null)
	const nav = useNavigate()

	const createUser = async (body: any) => {
		try {
			const response: any = await instance.post(`${API_BASE_URL}/auth/signup`, body, {
				headers: {
					...HTTP_HEADERS,
				},
			})

			const json = await response.json()
			return json
		} catch (error) {
			console.error(error)
		}
	}

	const fetchToken = async (body: any) => {
		try {
			const response: any = await instance
				.post(`${API_BASE_URL}/auth/login`, body, {
					headers: HTTP_HEADERS,
				})
				.then(({ data }) => {
					fetchProfile(data.refresh_token)
					storageService.add('access_token', data.access_token)
					storageService.add('refresh_token', data.refresh_token)
					return data
				})
				.catch(error => console.error(error))

			setHasToken(true)

			return response
		} catch (error) {
			return Promise.reject(error)
		}
	}

	const fetchProfile = async (tokenValue: string) => {
		try {
			const { data } = await instance.get(`${API_BASE_URL}/auth/profile`, {
				headers: {
					...HTTP_HEADERS,
					refresh_token: tokenValue,
					Authorization: `Bearer ${tokenValue}`,
				},
			})

			setCurrentUser(data)
			nav(URLS.HOMEPAGE)
		} catch (error) {
			console.error(error)
		}
	}

	const getToken = (tokenName: string) => {
		const currentToken = storageService.get(tokenName)

		if (!currentToken) {
			return 'tokenExpired'
		}

		return currentToken
	}

	useEffect(() => {
		const checkLoggedIn = async () => {
			setHasToken(false)
			const access_token: string = storageService.get('access_token') as string
			const refresh_token: string = storageService.get('refresh_token') as string

			if (!access_token && !refresh_token) return
			fetchProfile(access_token)
		}

		checkLoggedIn()
	}, [hasToken])

	const logout = () => {
		storageService.remove('access_token')
		setAccessToken(undefined)
		setRefreshToken(undefined)
		setHasToken(false)
		setCurrentUser(null)
		nav(URLS.HOMEPAGE)
	}

	return (
		<UserContext.Provider
			value={{
				createUser,
				access_token,
				refresh_token,
				fetchToken,
				setAccessToken,
				setRefreshToken,
				hasToken,
				setHasToken,
				getToken,
				currentUser,
				setCurrentUser,
				logout,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
