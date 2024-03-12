import type { Metadata } from 'next'

import { Fragment, type PropsWithChildren } from 'react'

import Footer from '@/component/footer/footer'
import Header from '@/component/header/header'

import getTranslation from '@/i18n/server'
import getDefaultMeta from '@/util/getDefaultMeta'

export async function generateMetadata(): Promise<Metadata> {
	const tr = await getTranslation('Head')
	return {...getDefaultMeta(), title: tr('log.title'), description: tr('log.description') }
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<Fragment>
			<Header />
			<main>{children}</main>
			<Footer />
		</Fragment>
	)
}
