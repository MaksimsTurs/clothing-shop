import scss from './scss/loading.module.scss'

import ProductsLoader from '@/component/loader/products-loader/productsLoader'
import Header from '@/component/header/header'
import { Fragment } from 'react'

export default function Loading() {
	return (
		<Fragment>
      <Header/>
			<div className={scss.img_loading_container}>
        <div className={`${scss.img_default_style} ${scss.img_loading}`}></div>
        <div className={scss.img_text_container}>
          <div style={{ width: '14rem' }} className={`${scss.img_default_style} ${scss.img_text}`}></div>
          <div style={{ width: '10rem' }} className={`${scss.img_default_style} ${scss.img_text}`}></div>
          <div style={{ width: '12rem' }} className={`${scss.img_default_style} ${scss.img_text}`}></div>
          <div style={{ width: '8rem' }} className={`${scss.img_default_style} ${scss.img_text}`}></div>
        </div>
			</div>
			<ProductsLoader />
		</Fragment>
	)
}
