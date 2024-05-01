import scss from '../page.module.scss'

import ProductImagePreview from '../component/productImagePreview'
import StarRating from '@/component/star-rating/starRating'
import ProductCost from '@/component/product-cost/productCost'
import ProductCountContainer from '../component/productCountContainer'
import Description from '../component/description'

import { Fragment } from 'react'
import { cookies } from 'next/headers'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

import getProductByID from '../fetching/getProductByID'

import type { PageProps } from '../page.type'
import type { Metadata } from 'next'

import defaultMetadata from '../../defaultMeta'

import getTranslation from '@/localization/server'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { title, description } = await getProductByID(params.id)
  return {...defaultMetadata(), title: title || 'Not found!', description }
}

export default async function Page({ params }: PageProps) {
  const data = await getProductByID(params.id)
  const t = await getTranslation('product-page')

  const stockColor: string = (data.stock || 0) > 0 ? 'green' : 'red'
  const language: string = cookies().get('locale')?.value || 'en'
  
  return(
    <main style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className={scss.product_data_container}>
        <ProductImagePreview images={data.images}/>
        <div className={scss.product_data_content}>
          <h4 className={scss.product_title}>{data.title}</h4>
          <StarRating rating={data.rating}/>
          <section className={scss.product_in_stock}>
            <p style={{ color: stockColor }}>{data.stock}</p>
            <p>{data?.title}</p>
            {data.category ?
              <Fragment>
                <p>{t("in-category")}</p>
                <Link className={scss.product_category_link} href={`/${language}/search?title=${data?.category}`}>{data.category}</Link>
              </Fragment> : null}
          </section>
          <ProductCost price={data.price} precent={data.precent}/>
          {/**--------------NOT IMPLEMENTED--------------------- */}
          {/* <ul className={scss.product_colors_list}>
            <li style={{ backgroundColor: 'red' }}></li>
            <li style={{ backgroundColor: 'green' }}></li>
            <li style={{ backgroundColor: 'blue' }}></li>
          </ul> */}
          <ProductCountContainer product={data}/>
          <section className={scss.product_border_bottom}>
            <Link href={`/${language}/checkout?id=${data._id}`} className={scss.product_buy_button}>
              <ShoppingCart />
              <p>{t("buy")}</p>
            </Link>
          </section>
          <Description text={data.description}/>
        </div>
      </div>
    </main>
  )
}