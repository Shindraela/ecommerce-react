const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const URLS = {
	HOMEPAGE: '/',
	SIGNUP: '/signup',
	LOGIN: '/login',
	CART: '/cart',
	PRODUCTS: '/products',
	PROFILE: '/profile',
}

const HTTP_HEADERS = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
}

export { API_BASE_URL, URLS, HTTP_HEADERS }
