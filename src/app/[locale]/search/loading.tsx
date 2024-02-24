import scss from './scss/loading.module.scss'

import ProductsLoader from '@/component/loader/products-loader/productsLoader'

export default function Loading() {
  return(
    <div className={scss.loading_container}>
      <div className={`${scss.loading_def_style} ${scss.loading_filter_container}`}></div>
      <ProductsLoader/>
    </div>
  )
}