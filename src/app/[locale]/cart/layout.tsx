import { Fragment, type PropsWithChildren } from 'react'

import Header from '@/component/header/header'
import Footer from '@/component/footer/footer'
import getTranslation from '@/i18n/server'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const tr = await getTranslation('Cart')
  return {
    title: tr('cart.head.title')
  }
}

export default function Layout({ children }: PropsWithChildren) {
	return (
		<Fragment>
			<Header/>
			{children}
			<Footer/>
		</Fragment>
	)
}
