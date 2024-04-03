import scss from './scss/loading.module.scss'

import ProductsLoader from '@/component/loader/products-loader/productsLoader'
import Header from '@/component/header/header'
import Footer from '@/component/footer/footer'

import { Fragment } from 'react'

export default function Loading() {
	return (
		<Fragment>
      <Header/>
			<div className={scss.img_loading_container}>
        <div className={`${scss.default_style} ${scss.img_loading}`}></div>
        <div className={scss.img_text_container}>
          <div className={`${scss.default_style} ${scss.img_text}`}></div>
          <div className={`${scss.default_style} ${scss.img_text}`}></div>
          <div className={`${scss.default_style} ${scss.img_text}`}></div>
          <div className={`${scss.default_style} ${scss.img_text}`}></div>
        </div>
			</div>
			<ProductsLoader />
      <Footer/>
		</Fragment>
	)
}
