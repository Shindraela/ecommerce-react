import axios from 'axios'
import { API_BASE_URL, HTTP_HEADERS } from '../constants'
import storageService from './storage.service'

const instance = axios.create({
	baseURL: 'http://localhost:3001',
	headers: {
		'Content-Type': 'application/json',
	},
})
const localAccessToken = storageService.get('access_token')
const localRefreshToken = storageService.get('refresh_token')

const refreshToken = async () => {
	if (!localAccessToken && !localRefreshToken) return
	const { data } = await instance.get(`${API_BASE_URL}/auth/refresh-token`, {
		headers: {
			...HTTP_HEADERS,
			refresh_token: localRefreshToken,
			Authorization: `Bearer ${localRefreshToken}`,
		},
	})

	return data
}

instance.interceptors.request.use(
	config => {
		const token = storageService.get('access_token')
		if (token) {
			config.headers['access_token'] = token // for Node.js Express back-end
		}

		return config
	},
	error => {
		return Promise.reject(error)
	},
)

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
			if (err.response.status === 403 && !originalConfig._retry) {
				originalConfig._retry = true

				try {
					const data = await refreshToken()
					const { access_token, refresh_token } = data

					storageService.add('access_token', access_token)
					storageService.add('refresh_token', refresh_token)

					instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

					return instance(originalConfig)
				} catch (_error) {
					return Promise.reject(_error)
				}
			}

			// Handle case where there is no access & refresh token (no user connected at all)
			if (!localAccessToken && !localRefreshToken) {
				return instance(originalConfig)
			}
		}

		return Promise.reject(err)
	},
)

export default instance
