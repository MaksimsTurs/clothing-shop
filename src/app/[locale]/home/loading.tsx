import scss from './scss/loading.module.scss'

import { Fragment } from "react";

import ProductLoaderContainer from "@/component/loader/product-loader-container/productLoadeContainer";

export default function Loading() {
  return(
    <Fragment>
      <div className={scss.loader_statistic_container}>
        <div className={scss.loader_statistic_body}>
          <div className={scss.loader_statistic_title_container}>
            <div className={scss.loader_statistic_title}></div>
            <div className={scss.loader_statistic_title}></div>
            <div className={scss.loader_statistic_title}></div>
          </div>
          <div className={scss.loader_statistic_description_container}>
            <div className={scss.loader_statistic_description}></div>
            <div className={scss.loader_statistic_description}></div>
            <div className={scss.loader_statistic_description}></div>
          </div>
          <div className={scss.loader_statistic_counts}>
            <div className={scss.loader_statistic_count}></div>
            <div className={scss.loader_statistic_count}></div>
            <div className={scss.loader_statistic_count}></div>
          </div>
        </div>
      </div>
      <main style={{ padding: '1rem' }}><ProductLoaderContainer productsLoadersCount={6}/></main>
    </Fragment>
  )
}