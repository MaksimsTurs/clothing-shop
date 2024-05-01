import { Fragment, type PropsWithChildren } from 'react'

import type { Metadata } from 'next'

import defaultMetadata from '../../defaultMeta'
import getTranslation from '@/localization/server'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslation('metadata-checkout-thank')
	return {
		...defaultMetadata(), 
		title: t('title'),
		description: t('description')
	}
}

export default function RootLayout({ children }: PropsWithChildren) {
	return <Fragment>{children}</Fragment>
}