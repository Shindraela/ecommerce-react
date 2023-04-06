import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { REACT_APP_API_BASE_URL, URLS } from '../constants'
import { handleStorage } from '../handleStorage'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const [token, setToken] = useState(null)
	const [currentUser, setCurrentUser] = useState(null)
	const nav = useNavigate()

	const createUser = async body => {
		try {
			const response = await fetch(`${REACT_APP_API_BASE_URL}/users/`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			})

			const json = await response.json()
			return json
		} catch (error) {
			console.error(error)
		}
	}

	const fetchToken = async body => {
		try {
			const response = await fetch(`${REACT_APP_API_BASE_URL}/auth/login`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			})

			const json = await response.json()
			if (json.statusCode === 401) {
				return json
			} else {
				const storage = new handleStorage()
				storage.add('token', json)
				fetchProfile(json)
			}
		} catch (error) {
			console.error(error)
		}
	}

	const refreshToken = async refreshToken => {
		const body = {
			refreshToken: refreshToken,
		}

		try {
			const response = await fetch(
				`${REACT_APP_API_BASE_URL}/auth/refresh-token`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				},
			)

			const json = await response.json()
			return json
		} catch (error) {
			console.error(error)
		}
	}

	const fetchProfile = async token => {
		if (token == null) return

		try {
			const response = await fetch(`${REACT_APP_API_BASE_URL}/auth/profile`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
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

	const isAuthenticated = () => {
		const storage = new handleStorage()
		const token = storage.get('token')

		if (!token) {
			return null
		}

		return JSON.parse(token)
	}

	useEffect(() => {
		const checkLoggedIn = async () => {
			let token = isAuthenticated()
			const storage = new handleStorage()

			if (token !== null) {
				// call refresh token for setting new access token
				const newToken = await refreshToken(token.refresh_token)
				setToken(newToken)
				storage.add('token', newToken)

				const response = await fetch(`${REACT_APP_API_BASE_URL}/auth/profile`, {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
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
				isAuthenticated,
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
