import { Fragment, type PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Administration Panel',
	description: 'It is Administration panel!',
	robots: { follow: false, index: false },
}

export default function RootLayout({ children }: PropsWithChildren) {
	return <Fragment>{children}</Fragment>
}
