import scss from '../scss/productData.module.scss'

import type { Metadata } from "next"
import type { ProductProps } from "../product.type"

import serverGetProductByID from '@/server-action/serverGetProductByID'
import ProductImagePreview from '../component/productImagePreview'
import StarRating from '@/component/star-rating/starRating'
import ProductCost from '@/component/product-cost/productCost'
import ProductCountContainer from '../component/productCountContainer'

import getTranslation from '@/i18n/server'
import getDefaultMeta from '@/util/getDefaultMeta'

export async function generateMetadata({ params }: ProductProps): Promise<Metadata> {
  const product = await serverGetProductByID(params.id)
  return {...getDefaultMeta(), title: product.title, description: product.description}
}

export default async function Page({ params }: ProductProps) {
  const productData = await serverGetProductByID(params.id)
  const tr = await getTranslation('Product-Page')
  return(
    <main>
      <div className={scss.product_data_container}>
        <ProductImagePreview images={productData.images}/>
        <div className={scss.product_data_content}>
          <h4 className={scss.product_title}>{productData.title}</h4>
          <StarRating rating={productData.rating}/>
          <ProductCost cost={productData.price} precent={productData.precent}/>
          <section className={scss.product_in_stock}>
            <p>{tr('in-stock')}:</p>
            <p style={{ color: productData.stock > 0 ? 'green' : 'red' }}>{productData.stock}</p>
          </section>
          <ProductCountContainer product={productData}/>
          <p className={scss.product_description}>{productData.description}</p>
        </div>
      </div>
    </main>
  )
}