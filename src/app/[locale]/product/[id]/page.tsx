import scss from '../scss/page.module.scss'

import type { Metadata } from "next"
import type { PageProps } from "../product.type"
import type { ProductData } from '@/store/admin/admin.type'

import ProductImagePreview from '../component/productImagePreview'
import StarRating from '@/component/star-rating/starRating'
import ProductCost from '@/component/product-cost/productCost'
import ProductCountContainer from '../component/productCountContainer'
import Error from '@/component/error/error'

import getTranslation from '@/i18n/server'

import getDefaultMeta from '@/util/getDefaultMeta'
import handleServerAction from '@/util/handleServerAction'

import actionGetProductByID from '../action/actionGetProductByID'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { data, error } = await handleServerAction<ProductData>(actionGetProductByID, [params.id])
  return {...getDefaultMeta(), title: data?.title || error?.message, description: data?.description || ''}
}

export default async function Page({ params }: PageProps) {
  const { data, error } = await handleServerAction<ProductData>(actionGetProductByID, [params.id])
  const tr = await getTranslation('Product-Page')
  
  return(
    <main style={{ alignItems: 'center', justifyContent: 'center' }}>
      {
        error && !data ?
        <Error error={error}/> :
        <div className={scss.product_data_container}>
          <ProductImagePreview images={data!.images}/>
          <div className={scss.product_data_content}>
            <h4 className={scss.product_title}>{data!.title}</h4>
            <StarRating rating={data!.rating}/>
            <ProductCost price={data!.price} precent={data!.precent}/>
            <section className={scss.product_in_stock}>
              <p>{tr('in-stock')}:</p>
              <p style={{ color: data!.stock > 0 ? 'green' : 'red' }}>{data!.stock}</p>
            </section>
            {data!.category ?
              <section className={scss.product_in_stock}>
                <p>Category:</p>
                <p>{data!.category}</p>
              </section> : null
            }
            <ProductCountContainer product={data!}/>
            <p className={scss.product_description}>{data!.description}</p>
          </div>
        </div>
      }
    </main>
  )
}