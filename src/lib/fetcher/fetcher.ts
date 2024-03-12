import type { RevalidateConf, ServerResError } from './fetcher.type'

import { DEV_API_URL, PROD_API_URL } from '@/const'

const URL: string = process.env.NODE_ENV === 'development' ? DEV_API_URL : PROD_API_URL

const fetcher = {
	baseURL: DEV_API_URL,
	createURL: function (URL: string) {
		if (this.baseURL) return `${this.baseURL}${URL}`
		return URL
	},
	getInit: function (headers?: any, body?: any) {
		let init = { headers: headers || {}, body: body || {} }

		if(body && !(body instanceof FormData)) {
			if(!headers) init.headers = { 'Content-Type': 'application/json' }
			if(!Object.hasOwn(headers, 'Content-Type')) init.headers = {...init.headers, 'Content-Type': 'application/json'}
			
			init.body = JSON.stringify(body)
		} else {
			init.body = body
		}
		
		return init
	},
	get: async function <T>(URL: string, revalidate?: RevalidateConf) {
		const response: Response = await fetch(this.createURL(URL), { cache: revalidate?.cache, next: { revalidate: revalidate?.time, tags: revalidate?.tags } })
		
		if (!response.ok) {
			const responseJSON: ServerResError = await response.json()
			throw JSON.stringify(responseJSON)
		}
		
		const responseJSON: T = await response.json()
		return responseJSON
	},
	post: async function <T>(URL: string, body?: any, headers?: Headers, revalidate?: RevalidateConf) {
		const init = this.getInit(headers, body)

		const response: Response = await fetch(this.createURL(URL), { 
			method: 'POST',
			body: init.body as BodyInit,
			headers: init.headers,
			cache: revalidate?.cache,
			next: { revalidate: revalidate?.time, tags: revalidate?.tags },
		})

		if (!response.ok) {
			const responseJSON = await response.json()
			throw JSON.stringify(responseJSON)
		}

		const responseJSON: T = await response.json()
		return responseJSON
	},
}

export default fetcher
