'use client'

import scss from '../../scss/dataPage.module.scss'

import type { DataPageProps } from '../../admin.type'
import type { PropsWithChildren } from 'react'
import type { ProductData } from '@/store/admin/admin.type'
import type { AppDispatch } from '@/store/store'
import type { RemoveFrom } from '@/store/admin/admin.type'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'

import createEntrieName from '@/lib/createEntrieName/createEntrieName'

import getFormatedValue from '../../helpers/getFromatedValue'

import firstLetterUpperCase from '@/util/firstLetterUpperCase'

import StarRating from '@/component/star-rating/starRating'

import { CURR_CURRENCY } from '@/const'

import removeItem from '@/store/admin/action/removeItem'

import ExtendedIMG from '@/component/extended-img/extendedIMG'

export default function DataPage({ data, ignore, title, children }: PropsWithChildren<DataPageProps>) {
	const [hoveredIMG, setHoveredIMG] = useState<string | undefined>(undefined)

	const router = useRouter()
	
	const dispatch = useDispatch<AppDispatch>()

	const pathSplited: string[] = usePathname().split('/')

	let itemID: string
	//Create entries from object.
	let findedItemEntries: [string, unknown][] = []
	//Get User Avatar or Product Images
	let itemIcons: false | string[] = false
	//Calculate total cost
	let totalCost: number = 0
	//If data is Section, get their products
	let dataItems: ProductData[] = []

	
	if(data) {
		itemID = data._id
		findedItemEntries = Object.entries(data)
		itemIcons = (data.images || data.avatar) ? ((data.images || [data.avatar]) as string[]) : false
		totalCost = data.products ? (data.products as []).reduce((prev, curr: { price: number; precent: number }) => prev + (curr.price - curr.price * curr.precent), 0) : 0
		dataItems = data.products as ProductData[]
	}

	const remove = async (): Promise<void> => {
		await dispatch(removeItem({ id: itemID, from: pathSplited[pathSplited.length - 1] as RemoveFrom }))
		router.back()
	}

	return (
		<div className={scss.data_container}>
			<div className={scss.data_container_info}>
				<h2 className={scss.data_container_title}>{title}</h2>
				{findedItemEntries.length > 0 ? (
					<div className={scss.data_content}>
						<div className={scss.data_images_container}>
							{itemIcons &&
								itemIcons.map(iconSrc => (
									<ExtendedIMG
										key={iconSrc}
										alt={data.title || data.firstName}
										src={iconSrc}
										width={1440}
										height={1440}
										quality={100}
										onMouseEnter={() => setHoveredIMG(iconSrc)}
										onMouseLeave={() => setHoveredIMG(undefined)}
									/>
								))}
							{hoveredIMG ? <Image className={scss.data_zoomed_img} alt='Product IMG Zoomed' src={hoveredIMG} width={1440} height={1440} quality={100}/> : null}
						</div>
						<div className={scss.data_body}>
							{findedItemEntries.map(itemData => {
								const itemKey: string = itemData[0]
								const itemValue = itemData[1] as any

								let renderKey: string | string[] = firstLetterUpperCase(createEntrieName(itemKey))
								let renderValue: any = getFormatedValue(itemValue, itemKey)
								let isValueArray: boolean = Array.isArray(itemValue)

								if (itemKey === 'price' && data.precent) renderValue = `${itemValue}$ (with ${(data.precent * 100).toFixed(2)}% price is ${(itemValue - itemValue * data.precent).toFixed(2)}$)`

								return (
									<Fragment key={itemKey}>
										{(renderValue && !isValueArray) &&
										  ignore?.forData &&
										  !ignore.forData.includes(itemKey) ? (
											<section className={scss.data_body_content}>
												<p className={scss.data_key}>{renderKey}:</p>
												<p className={scss.data_value}>{renderValue}</p>
											</section>
										) : null}
									</Fragment>
								)
							})}
							{totalCost > 0 ? (
								<section className={scss.data_body_content}>
									<p className={scss.data_key}>Total Cost:</p>
									<p className={scss.data_value}>{totalCost.toFixed(2)} {CURR_CURRENCY}</p>
								</section>
							) : null}
							{dataItems?.length > 0 ? (
								<section style={{ gap: '1.45rem', flexWrap: 'wrap', alignItems: 'flex-start' }} className={scss.data_body_content}>
									<p style={{ width: '100%' }} className={scss.data_key}>Products:</p>
									<Fragment>
										{dataItems.map(item => (
											<Link href={`/ru/admin/item/product?id=${item._id}`} key={item._id}>
												<div className={scss.data_body_image}>
													<ExtendedIMG alt={item.title} src={item.images[0]} width={1440} height={1440}/>
												</div>
												<div>
													<p className={scss.data_title}>{item.title}</p>
													<StarRating rating={item.rating}/>
													<p>{(item.price - (item.price * (item.precent || 0))).toFixed(2)} {CURR_CURRENCY}</p>
													<p>{item.stock} in Stock</p>
												</div>
											</Link>
										))}
									</Fragment>
								</section>
							) : null}
						</div>
					</div>
				) : null}
				<button onClick={remove}>Delete</button>
			</div>
			{children}
		</div>
	)
}
