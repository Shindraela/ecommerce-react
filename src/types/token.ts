export default interface IToken {
	access_token: string
	refresh_token: string
}

export type TokenType = {
	access_token: string
	refresh_token: string
	status: number
}
