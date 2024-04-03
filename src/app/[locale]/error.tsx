'use client'

import Header from '@/component/header/header'
import Footer from '@/component/footer/footer'

import type { ErrorPageProps } from '../../global.type'

import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import parseJSONError from '@/lib/parseJSONError/parseJSONError'

import { useCurrentLocale } from '@/i18n/client'
import { ServerResError } from '@/lib/fetcher/fetcher.type'

export default function ErrorPage({ error }: ErrorPageProps) {
	const [errorData, setErrorData] = useState<ServerResError | undefined>()
	const currLanguage = useCurrentLocale()

	useEffect(() => {
		if(error.message.replace('Error:', '').trim().startsWith('{')) {
			setErrorData(parseJSONError(error))
		} else setErrorData(error)
	}, [error])

	return(
		<Fragment>
			<Header/>
			<main className='error_main_container'>
				<div className='error_main_body'>
					<svg viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
					<div>
						<p>{errorData?.message}{errorData?.code ? ` - ${errorData?.code}` : null}</p>
						<Link href={`/${currLanguage}/help`}>Need Help? write a E-Mail</Link>
					</div>
				</div>
			</main>
			<Footer/>
		</Fragment>
	)
}
