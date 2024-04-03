import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import type { SearchProps } from "./search.type";

import SearchContainer from "./component/searchContainer";

import actionFilteredProduct from "./action/actionFilteredProduct";

import queryCache from "@/util/queryCache";

export default async function Page({ searchParams }: SearchProps) {
	// const c1 = queryCache.getQueryData(['page-0', 'category-null'])
	// console.log(`${JSON.stringify(c1)?.slice(0, 100)}...`)
	
	// await queryCache.prefetchQuery({
	// 	queryKey: ['page-0', 'category-null'],
	// 	queryFn: async () => await actionFilteredProduct({ page: 0, category: [], price: 0, rating: 0, title: searchParams.title })
	// })
	
	// const c2 = queryCache.getQueryData(['page-0', 'category-null'])
	// console.log(`${JSON.stringify(c2)?.slice(0, 100)}...`)

	return(
		// <HydrationBoundary state={dehydrate(queryCache)}>
			<SearchContainer/>
		// </HydrationBoundary>
	)
}