import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'
import storageService from './services/storage.service'
import { Buffer } from 'buffer'
import { URLS } from './constants'

const parseJwt = token => {
	return JSON.parse(Buffer.from(token.split('.')[1], 'base64'))
}

export const AuthVerify = () => {
	let location = useLocation()
	const nav = useNavigate()
	const [decodedJwt, setDecodedJwt] = useState(undefined)
	const [access_token, setAccessToken] = useState(undefined)

	useEffect(() => {
		const currentToken = storageService.get('access_token')
		setAccessToken(currentToken)

		if (access_token) {
			setDecodedJwt(parseJwt(access_token))

			if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
				storageService.remove('access_token')
				setAccessToken(undefined)
				nav(URLS.HOMEPAGE)
			}
		}
	}, [location])

	return <></>
}
