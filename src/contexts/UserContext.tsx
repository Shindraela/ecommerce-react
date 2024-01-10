import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { API_BASE_URL, HTTP_HEADERS, URLS } from '../constants'
import { handleStorage } from '../handleStorage'
import ChildrenProps from '../types/children'
import IToken from '../types/token'
import IUser, { UserContextType } from '../types/user'

const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: ChildrenProps) => {
	const [token, setToken] = useState<IToken | null>(null)
	const [currentUser, setCurrentUser] = useState<IUser | null>(null)
	const nav = useNavigate()
	const storage = new handleStorage()

	const createUser = async (body: object) => {
		try {
			const response = await fetch(`${API_BASE_URL}/users/`, {
				method: 'POST',
				headers: {
					...HTTP_HEADERS,
				},
				body: JSON.stringify(body),
			})

			const json = await response.json()
			return json
		} catch (error) {
			console.error(error)
		}
	}

	const fetchToken = async (body: object) => {
		try {
			const response = await fetch(`${API_BASE_URL}/auth/login`, {
				method: 'POST',
				headers: {
					...HTTP_HEADERS,
				},
				body: JSON.stringify(body),
			})

			const json = await response.json()
			if (json.statusCode === 401) {
				return json
			} else {
				storage.add('token', json)
				fetchProfile(json)
			}
		} catch (error) {
			console.error(error)
		}
	}

	const refreshToken = async (refreshToken: string) => {
		const body = {
			refreshToken: refreshToken,
		}

		try {
			const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
				method: 'POST',
				headers: {
					...HTTP_HEADERS,
				},
				body: JSON.stringify(body),
			})

			const json = await response.json()
			return json
		} catch (error) {
			console.error(error)
		}
	}

	const fetchProfile = async (token: IToken) => {
		if (token == null) return

		try {
			const response = await fetch(`${API_BASE_URL}/auth/profile`, {
				method: 'GET',
				headers: {
					...HTTP_HEADERS,
					Authorization: `Bearer ${token.access_token}`,
				},
			})

			const json = await response.json()
			if (json) {
				setCurrentUser(json)
				nav(URLS.HOMEPAGE)
			}
		} catch (error) {
			console.error(error)
		}
	}

	const getToken = () => {
		const token = storage.get('token')

		if (!token) {
			return null
		}

		return JSON.parse(token)
	}

	useEffect(() => {
		const checkLoggedIn = async () => {
			let token = getToken()

			if (token !== null) {
				// call refresh token for setting new access token
				const newToken = await refreshToken(token.refresh_token)
				setToken(newToken)
				storage.add('token', newToken)

				const response = await fetch(`${API_BASE_URL}/auth/profile`, {
					method: 'GET',
					headers: {
						...HTTP_HEADERS,
						Authorization: `Bearer ${token.access_token}`,
					},
				})

				const json = await response.json()
				setCurrentUser(json)
			}
		}

		checkLoggedIn()
	}, [])

	const logout = () => {
		const storage = new handleStorage()
		storage.remove('token')
		setToken(null)
		setCurrentUser(null)
		nav(URLS.HOMEPAGE)
	}

	return (
		<UserContext.Provider
			value={{
				createUser,
				token,
				fetchToken,
				setToken,
				getToken,
				currentUser,
				setCurrentUser,
				logout,
				storage,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
