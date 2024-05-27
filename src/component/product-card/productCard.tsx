'use client'

import scss from './productCard.module.scss'

import ExtendedIMG from "../extended-img/extendedIMG";
import ProductCost from "../product-cost/productCost";
import StarRating from "../star-rating/starRating";

import Link from "next/link";

import type { ProductCardProps } from "./productCard.type";

import cookies from "@/util/coockies";

export default function ProductCard({ product, precent }: ProductCardProps) {
  const language = cookies.get('locale') || 'en'

  return(
    <Link key={product._id} href={`/${language}/product/${product._id}`} className={scss.product_article_container}>
      <div className={scss.product_description}>{product.description ? <p>{product.description}</p> : <p className={scss.product_no_description}>No description!</p>}</div>
      <ExtendedIMG width={1440} height={200} className={scss.product_img} src={product.images[0]} alt={product.title}/>
      <section className={scss.product_data_container}>
        <h4 className={scss.product_name}>{product.title}</h4>
        <StarRating rating={product.rating || 0.00} />
        <ProductCost price={product.price} precent={precent || 0} />
      </section>
    </Link>
  )
}