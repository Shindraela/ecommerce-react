import { AxiosResponse } from 'axios'
import instance from './api'

type HeaderType = {
	headers: {
		Authorization: string
	}
}

const responseBody = (response: AxiosResponse) => response
export const requests = {
	get: (url: string, headers?: HeaderType) => instance.get(url, headers).then(responseBody),
	post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
	delete: (url: string) => instance.delete(url).then(responseBody),
}
