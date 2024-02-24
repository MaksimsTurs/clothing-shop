import type { Metadata } from 'next'
import { Fragment } from 'react'

import Header from '@/component/header/header'
import Footer from '@/component/footer/footer'
import BrandList from './component/brandList'
import WebsiteStatistic from './component/websiteStatistic'
import ProductsContainer from '@/component/product-container/productsContainer'

import getTranslation from '@/i18n/server'

import serverGetAllProducts from '@/server-action/serverGetAllProducts'

export async function generateMetadata(): Promise<Metadata> {
	const tr = await getTranslation('Head')

	return {
		title: tr('home.title'),
		description: tr('home.description'),
		authors: [{ name: 'Maksims Turs' }],
	}
}

export default async function Page() {
	const { productsSections } = await serverGetAllProducts()

	return (
		<Fragment>
			<Header />
			<WebsiteStatistic />
			<BrandList />
			<main>
				{productsSections.map(list => (
					<ProductsContainer
						key={list._id}
						data={list.products.slice(0, 6)}
						title={list.title}
						expiredDate={list.expiredDate}
						viewAllLink={list.products.length > 6}
					/>
				))}
			</main>
			<Footer />
		</Fragment>
	)
}
