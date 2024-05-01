import { Fragment, type PropsWithChildren } from 'react'

import Header from '@/component/header/header'
import Footer from '@/component/footer/footer'

import defaultMeta from '../defaultMeta'

import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
	return {...defaultMeta, title: 'Help' }
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
