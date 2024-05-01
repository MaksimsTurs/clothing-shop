import scss from './productLoaderContainer.module.scss'

import ProductLoader from "../product-loader/productLoader";

export default function ProductLoaderContainer() {
  return(
    <div className={scss.product_loader_container}>{[...Array(10)].map((_, index) => <ProductLoader key={index}/>)}</div>
  )
}