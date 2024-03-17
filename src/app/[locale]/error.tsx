'use client'

import type { ErrorPageProps } from '../../global.type'

export default function ErrorPage({ error }: ErrorPageProps) {
	let code: number | undefined = undefined
	let message: string | undefined = undefined

	if(error.message.replace('Error:', '').trim().startsWith('{')) {
		const parsedError = JSON.parse(error.message.replace('Error:', '').trim())
		
		code = parsedError.code
		message = parsedError.message
	} else {
		message = error.message
	}

	return <p className='error_message_container'>{message}{code ? ` - ${code}` : null}</p>
}
