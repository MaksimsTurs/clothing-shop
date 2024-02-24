import type { Fetcher, RevalidateConf, ServerResError } from './fetcher.type'

import { DEV_API_URL, PROD_API_URL } from '@/const'

const URL: string = process.env.NODE_ENV === 'development' ? DEV_API_URL : PROD_API_URL

const fetcher: Fetcher = {
	baseURL: URL,
	createURL: function (URL: string) {
		if (this.baseURL) return `${this.baseURL}${URL}`

		return URL
	},
	validateFetchData: function (headers?: any, body?: any) {
		let fetchBody = body
		let fetchHeaders = headers

		if (body) {
			if (body instanceof FormData) {
				fetchBody = body
			} else if (typeof body === 'object' && !Array.isArray(body)) {
				fetchBody = JSON.stringify(body)
				if (!fetchHeaders) {
					fetchHeaders = { 'Content-Type': 'application/json' }
				} else if (!Object.hasOwn(fetchHeaders, 'Content-Type')) {
					fetchHeaders = { ...fetchHeaders, 'Content-Type': 'application/json' }
				}
			} else {
				fetchBody = body
			}
		}

		return { body: fetchBody, header: fetchHeaders }
	},
	get: async function <T>(URL: string, revalidate?: RevalidateConf) {
		const response: Response = await fetch(this.createURL(URL), {
			cache: revalidate?.cache,
			next: { revalidate: revalidate?.time, tags: revalidate?.tags }
		})
		
		if (!response.ok) {
			const responseJSON: ServerResError = await response.json()
			throw new Error(JSON.stringify(responseJSON))
		}
		
		const responseJSON: T = await response.json()
		return responseJSON
	},
	post: async function <T>(
		URL: string,
		body?: any,
		headers?: Headers,
		revalidate?: RevalidateConf
	) {
		const validatedData = this.validateFetchData(headers, body)

		const response: Response = await fetch(this.createURL(URL), {
			method: 'POST',
			body: validatedData.body as BodyInit,
			headers: validatedData.header,
			cache: revalidate?.cache,
			next: { revalidate: revalidate?.time, tags: revalidate?.tags },
		})

		if (!response.ok) {
			const responseJSON = await response.json()
			throw new Error(JSON.stringify(responseJSON))
		}

		const responseJSON: T = await response.json()
		return responseJSON
	},
}

export default fetcher
