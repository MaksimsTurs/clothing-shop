import scss from './scss/loading.module.scss'

export default function Loading() {
  return(
    <main className={scss.loader_product_container}>
      <div className={scss.loader_product_body}>
        <div className={scss.loader_product_imgs_container}>
          <div className={scss.loader_product_imgs_slides}>
            <div className={scss.loader_product_img_slide}></div>
            <div className={scss.loader_product_img_slide}></div>
            <div className={scss.loader_product_img_slide}></div>
          </div>
          <div className={scss.loader_product_curr_img}></div>
        </div>
        <div className={scss.loader_text_container}>
          <div className={scss.loader_text}></div>
          <div className={scss.loader_text}></div>
          <div className={scss.loader_text}></div>
          <div className={scss.loader_text}></div>
          <div className={scss.loader_buttons_container}>
            <div className={scss.loader_button}></div>
            <div className={scss.loader_button}></div>
          </div>
          <div className={scss.loader_button}></div>
          <div className={scss.loader_text}></div>
          <div className={scss.loader_text}></div>
          <div className={scss.loader_text}></div>
        </div>
      </div>
    </main>
  )
}