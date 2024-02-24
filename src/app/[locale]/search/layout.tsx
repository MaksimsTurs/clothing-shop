import type { Metadata } from 'next'
import { Fragment, type PropsWithChildren } from 'react'

import Footer from '@/component/footer/footer'
import Header from '@/component/header/header'

export const metadata: Metadata = {
	title: 'Search',
	description: 'Search page!',
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
