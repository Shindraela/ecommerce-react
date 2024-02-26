import axios from 'axios'
import { API_BASE_URL, HTTP_HEADERS } from '../constants'
import storageService from './storage.service'

const instance = axios.create({
	baseURL: 'http://localhost:3001',
	headers: {
		'Content-Type': 'application/json',
	},
})
const localRefreshToken = storageService.get('refresh_token')

export const refreshToken = async () => {
	if (!localRefreshToken) return

	const { data } = await instance.get(`${API_BASE_URL}/auth/refresh-token`, {
		headers: {
			...HTTP_HEADERS,
			Authorization: `Bearer ${localRefreshToken}`,
		},
	})

	return data
}

instance.interceptors.response.use(
	response => {
		return response
	},
	async err => {
		const originalConfig = err.config

		if (
			(!originalConfig.url.includes('/auth/signup') ||
				!originalConfig.url.includes('/auth/login')) &&
			err.response
		) {
			// Access Token was expired
			if (err.response.status === 401) {
				const data = await refreshToken(localRefreshToken)
				const { access_token, refresh_token } = data

				storageService.add('access_token', access_token)
				storageService.add('refresh_token', refresh_token)

				instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
				originalConfig.headers['Authorization'] = `Bearer ${access_token}`

				return instance(originalConfig)
			}
		}

		return Promise.reject(err)
	},
)

export default instance
