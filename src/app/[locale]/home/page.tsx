import { Fragment } from 'react'

import WebsiteStatistic from './component/websiteStatistic'
import ProductsContainer from '@/component/product-container/productsContainer'

import getHomeData from './fetching/getHomeData'

import type { ProductAction } from '@/store/admin/admin.type'

export default async function Page() {
	const { products, actions, categories, ...statistic } = await getHomeData()

	const data = [...categories, ...actions]

	return (
		<Fragment>
			<WebsiteStatistic statistic={statistic}/>
			<main style={{ padding: '1rem 3rem', gap: '2rem' }}>
				{data.length > 0 ?
					data
					.sort((first, second) => (first.position || 0) - (second.position || 0))
					.map(item => 
						<ProductsContainer 
							id={item._id}
							key={item._id} 
							data={item.products?.slice(0, 6)} 
							expiredAt={(item as ProductAction)?.expiredAt} 
							title={item.title} 
							precent={item.precent}
							location={item.location}
							viewAllLink={(item.products?.length || 0) > 6}/>) : null}
				{products.length > 0 ? <ProductsContainer data={products} location='all'/> : null}
			</main>
		</Fragment>
	)
}
