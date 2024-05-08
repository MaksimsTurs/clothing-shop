import scss from './productLoaderContainer.module.scss'

import ProductLoader from "../product-loader/productLoader";

import type { ProductsLoaderContainerProps } from './productLoaderContainer.type';

export default function ProductLoaderContainer({ productsLoadersCount }: ProductsLoaderContainerProps) {
  return <div className={scss.product_loader_container}>{[...Array(productsLoadersCount || 10)].map((_, index) => <ProductLoader key={index}/>)}</div>
}