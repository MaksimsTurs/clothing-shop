import type { RevalidateConf } from './fetcher.type'

import { DEV_API_URL, PROD_API_URL } from '@/const'

const URL: string = process.env.NODE_ENV === 'development' ? DEV_API_URL : PROD_API_URL

const fetcher = {
	baseURL: URL,
	createURL: function (URL: string): string {
		if (this.baseURL) return `${this.baseURL}${URL}`
		return URL
	},
	getInit: function (headers?: any, body?: any): { headers: any, body: any } {
		let init = { headers: headers || {}, body: body || {} }

		if(body && !(body instanceof FormData)) {
			if(!headers) init.headers = { 'Content-Type': 'application/json' }
			if(headers && !Object.hasOwn(headers, 'Content-Type')) init.headers = {...init.headers, 'Content-Type': 'application/json'}
			
			init.body = JSON.stringify(body)
		} else {
			init.body = body
		}
		
		return init
	},
	get: async function <T>(URL: string, revalidate?: RevalidateConf): Promise<T> {
		const response: Response = await fetch(this.createURL(URL), { cache: revalidate?.cache, next: {...revalidate } })
		const responseJSON = await response.json()

		if (!response.ok) throw JSON.stringify(responseJSON)

		return responseJSON as T
	},
	post: async function <T>(URL: string, body?: any, headers?: Headers, revalidate?: RevalidateConf): Promise<T> {
		const init = this.getInit(headers, body)

		const response: Response = await fetch(this.createURL(URL), { method: 'POST', body: init.body as BodyInit, headers: init.headers })
		const responseJSON = await response.json()

		if (!response.ok) throw JSON.stringify(responseJSON)

		return responseJSON as T
	},
}

export default fetcher
