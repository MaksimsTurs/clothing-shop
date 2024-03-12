import { Fragment, type PropsWithChildren } from 'react'

import Header from '@/component/header/header'
import Footer from '@/component/footer/footer'

import type { Metadata } from 'next'
import getDefaultMeta from '@/util/getDefaultMeta'

export function generateMetadata(): Metadata {
	return {...getDefaultMeta(), title: 'Checkout'}
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<Fragment>
			<Header/>
			{children}
			<Footer/>
		</Fragment>
	)
}