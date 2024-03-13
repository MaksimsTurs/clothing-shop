'use client'

import '@/scss/root.scss'

import type { ErrorPageProps } from '../../global.type'

export default function ErrorPage({ error, reset }: ErrorPageProps) {
	let code = undefined
	let message = undefined

	if(error.message.replace('Error:', '').trim().startsWith('{')) {
		const parsedError = JSON.parse(error.message.replace('Error:', '').trim())
		
		code = parsedError.code
		message = parsedError.message
	} else {
		message = error.message
	}

	return <p className='error_message_container'>{message} - {code}</p>
}
