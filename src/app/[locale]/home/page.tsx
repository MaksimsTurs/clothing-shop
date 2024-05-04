import { Fragment } from 'react'

import WebsiteStatistic from './component/websiteStatistic'
import ProductsContainer from '@/component/product-container/productsContainer'

import getHomeData from './fetching/getHomeData'

export default async function Page() {
	const { products, sections, ...statistic } = await getHomeData()

	return (
		<Fragment>
			<WebsiteStatistic statistic={statistic}/>
			<main style={{ padding: '1rem 3rem', gap: '2rem' }}>
				{sections ? sections
					.sort((firstProduct, secondProduct) => (firstProduct.position || 0) - (secondProduct.position || 0))
					.map(section => <ProductsContainer key={section._id} data={section.products?.slice(0, 5)} expiredDate={section.expiredDate} title={section.title} viewAllLink={(section.products?.length || 0) > 6}/>) : null}
				{products ? <ProductsContainer data={products}/> : null}
			</main>
		</Fragment>
	)
}
