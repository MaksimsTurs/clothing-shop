import { Fragment, type PropsWithChildren } from 'react'
import type { Metadata } from 'next'

import Footer from '@/component/footer/footer'
import Header from '@/component/header/header'

export const metadata: Metadata = {
	title: 'Registration',
	description: 'Here you can registrate new account or go to log in page, when you should have one account!',
	keywords: ['registration', 'log in']
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
