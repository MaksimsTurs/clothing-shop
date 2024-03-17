'use client'

import scss from '../scss/dataPage.module.scss'

import type { DataPageProps } from '../admin.type'
import type { PropsWithChildren } from 'react'
import type { ProductData } from '@/store/product/product.type'

import Image from 'next/image'
import { Fragment, useState } from 'react'
import Link from 'next/link'

import createEntrieName from '@/lib/createEntrieName/createEntrieName'
import getFormatedValue from '../helpers/getFromatedValue'
import firstLetterUpperCase from '@/util/firstLetterUpperCase'

import StarRating from '@/component/star-rating/starRating'

export default function DataPage({ data, ignore, title, children }: PropsWithChildren<DataPageProps>) {
	const [hoveredIMG, setHoveredIMG] = useState<string | undefined>(undefined)

	//Create entries from object.
	const findedItemEntries = Object.entries(data)
	//Get User Avatar or Product Images
	const itemIcons = data.images || data.avatar ? ((data.images || [data.avatar]) as string[]) : false
	//Calculate total cost
	const totalCost = data.products ? (data.products as []).reduce((prev, curr: { price: number; precent: number }) => prev + (curr.price - curr.price * curr.precent), 0) : 0
	//If data is Section, get their products
	const dataItems = data.products as ProductData[]

	return (
		<div className={scss.data_container}>
			<div className={scss.data_container_info}>
				<h2 className={scss.data_container_title}>{title}</h2>
				{findedItemEntries.length > 0 ? (
					<div className={scss.data_content}>
						<div className={scss.data_images_container}>
							{itemIcons &&
								itemIcons.map(iconSrc => (
									<Image
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
							{hoveredIMG ? (
								<Image
									className={scss.data_zoomed_img}
									alt='Product IMG Zoomed'
									src={hoveredIMG}
									width={1440}
									height={1440}
									quality={100}
								/>
							) : null}
						</div>
						<div className={scss.data_body}>
							{findedItemEntries.map(itemData => {
								const itemKey = itemData[0]
								const itemValue = itemData[1] as any

								let renderKey = firstLetterUpperCase(createEntrieName(itemKey))
								let renderValue = getFormatedValue(itemValue, itemKey)
								let isValueArray = Array.isArray(itemValue)

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
							{totalCost > 0 && (
								<section className={scss.data_body_content}>
									<p className={scss.data_key}>Total Cost:</p>
									<p className={scss.data_value}>{totalCost.toFixed(2)}$</p>
								</section>
							)}
							{dataItems?.length > 0 && (
								<section
									style={{ gap: '1.45rem', flexWrap: 'wrap', alignItems: 'flex-start' }}
									className={scss.data_body_content}>
									<p style={{ width: '100%' }} className={scss.data_key}>Products:</p>
									<Fragment>
										{dataItems.map(item => (
											<Link href={`/ru/admin/product?id=${item._id}`} key={item._id}>
												<div className={scss.data_body_image}>
													<Image
														alt={item.title}
														src={item.images[0]}
														width={1440}
														height={1440}
													/>
												</div>
												<div >
													<p className={scss.data_title}>{item.title}</p>
													<StarRating rating={item.rating}/>
													<p>{(item.price - (item.price * (item.precent || 0))).toFixed(2)}$</p>
													<p>{item.stock} in Stock</p>
												</div>
											</Link>
										))}
									</Fragment>
								</section>
							)}
						</div>
					</div>
				) : null}
			</div>
			{children}
		</div>
	)
}
