import { Fragment, type PropsWithChildren } from 'react'

import type { Metadata } from 'next'

import defaultMeta from '../defaultMeta'

export async function generateMetadata(): Promise<Metadata> {
	return {...defaultMeta, robots: { follow: false, index: false }, title: 'Admin panel' }
}

export default function RootLayout({ children }: PropsWithChildren) {
	return <Fragment>{children}</Fragment>
}
