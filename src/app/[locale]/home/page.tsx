import type { Metadata } from 'next'

import { Fragment } from 'react'

import Header from '@/component/header/header'
import Footer from '@/component/footer/footer'
import BrandList from './component/brandList'
import WebsiteStatistic from './component/websiteStatistic'
import ProductsContainer from '@/component/product-container/productsContainer'

import getTranslation from '@/i18n/server'

import actionGetAll from '@/app/[locale]/home/action/actionGetAll'

import getDefaultMeta from '@/util/getDefaultMeta'
import handleServerAction from '@/util/handleServerAction'

import type { GetAll } from './page.type'
import Error from '@/component/error/error'

export async function generateMetadata(): Promise<Metadata> {
	const tr = await getTranslation('Head')
	return {...getDefaultMeta(), title: tr('home.title'), description: tr('home.description') }
}

export default async function Page() {
	const { data, error } = await handleServerAction<GetAll>(actionGetAll)

	return (
		<Fragment>
			<Header />
			{
				error && !data ?
				<Error error={error}/> :
				<Fragment>
					<WebsiteStatistic brandsNumber={data!.brandsNumber} productsNumber={data!.productsNumber} usersNumber={data!.usersNumber}/>
					<BrandList />
					<main>
						{data!.sections.map(list => <ProductsContainer key={list._id} data={list.products!.slice(0, 6)} title={list.title} expiredDate={list.expiredAt} viewAllLink={list.products!.length > 6}/>)}
						<ProductsContainer data={data!.products.slice(0, 6)} viewAllLink={data!.products.length > 6}/>
					</main>
				</Fragment>
			}
			<Footer />
		</Fragment>
	)
}
