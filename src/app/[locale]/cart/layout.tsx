import { Fragment, type PropsWithChildren } from 'react'

import type { Metadata } from 'next'

import Header from '@/component/header/header'
import Footer from '@/component/footer/footer'

import getDefaultMeta from '@/util/getDefaultMeta'
import getTranslation from '@/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const tr = await getTranslation('Head')
  return {...getDefaultMeta(), title: tr('cart.title'), description: tr('cart.description')}
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
