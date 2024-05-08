import type { Fetcher, FetchRevalidation, Header } from "./fetcher.type"

const URL: string = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'https://boutique-api.vercel.app'

const fetcher: Fetcher = {
	baseURL: URL,
	createURL: function (URL: string): string {
		if (this.baseURL) return `${this.baseURL}${URL}`
		return URL
	},
	getInit: function (headers?: Header, body?: any): { headers: Header, body: any } {
		let init = { headers: headers || {}, body: body || {} }
		if(body && !(body instanceof FormData)) {
			if(!headers) init.headers = { 'Content-Type': 'application/json' }
			if(headers && !('Content-Type' in headers)) init.headers = {...init.headers, 'Content-Type': 'application/json'}
			return {...init, body: JSON.stringify(body) }
		}
	
		return init
	},
	get: async function <T>(URL: string, revalidation?: FetchRevalidation, header?: Header): Promise<T> {
		const revBody = { cache: revalidation?.cache, next: { revalidate: revalidation?.time, tags: revalidation?.tags } }
		const init = this.getInit(header)

		const response: Response = await fetch(this.createURL(URL), { cache: revBody.cache, next: revBody.next, headers: init.headers })
		const responseJSON = await response.json()

		if (!response.ok) throw JSON.stringify(responseJSON)

		return responseJSON as T
	},
	post: async function <T>(URL: string, revalidation?: FetchRevalidation, body?: any, headers?: Header): Promise<T> {
		const revBody = { cache: revalidation?.cache, next: { revalidate: revalidation?.time, tags: revalidation?.tags } }
		const init = this.getInit(headers, body)

		const response: Response = await fetch(this.createURL(URL), { method: 'POST', body: init.body as BodyInit, headers: init.headers, cache: revBody.cache, next: revBody.next })
		const responseJSON = await response.json()

		if (!response.ok) throw JSON.stringify(responseJSON)

		return responseJSON as T
	},
}

export default fetcher
