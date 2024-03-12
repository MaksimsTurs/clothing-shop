import { Fragment, type PropsWithChildren } from 'react'

import Header from '@/component/header/header'
import Footer from '@/component/footer/footer'

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<Fragment>
			<Header/>
			{children}
			<Footer/>
		</Fragment>
	)
}
