'use client'

import '@/scss/root.scss'

import type { ErrorPageProps } from './global.type'

export default function ErrorPage({ error, reset }: ErrorPageProps) {
	const { code, message } = JSON.parse(error.message.replace('Error:', '').trim())
	return <p className='error_message_container'>{message} - {code}</p>
}
