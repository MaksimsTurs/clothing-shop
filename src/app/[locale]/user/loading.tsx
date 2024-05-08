import scss from './scss/loading.module.scss'

export default function Loading() {
  return (
    <main className={scss.loader_user_container}>
      <div className={scss.loader_user_body}>
        <div className={scss.loader_user_header_container}>
          <div className={scss.loader_user_header_body}>
            <div className={scss.loader_user_avatar}></div>
            <div className={scss.loader_user_data}>
              <div className={scss.loader_user_text}></div>
              <div className={scss.loader_user_text}></div>
              <div className={scss.loader_user_text}></div>
              <div className={scss.loader_user_text}></div>
            </div>
          </div>
          <div className={scss.loader_user_buttons}>
            <div className={scss.loader_user_button}></div>
            <div className={scss.loader_user_button}></div>
            <div className={scss.loader_user_button}></div>
            <div className={scss.loader_user_button}></div>
          </div>
        </div>
        <div className={scss.loader_user_products_container}>
          <div className={scss.loader_user_products_container_title}></div>
          <div className={scss.loader_user_product_item}>
            <div style={{ width: '4rem' }} className={scss.loader_user_product}></div>
            <div style={{ width: '7rem' }} className={scss.loader_user_product}></div>
            <div style={{ width: '2rem' }} className={scss.loader_user_product}></div>
          </div>
          <div className={scss.loader_user_product_item}>
            <div style={{ width: '5rem' }} className={scss.loader_user_product}></div>
            <div style={{ width: '9rem' }} className={scss.loader_user_product}></div>
            <div style={{ width: '4.5rem' }} className={scss.loader_user_product}></div>
          </div>
          <div className={scss.loader_user_product_item}>
            <div style={{ width: '7.4rem' }} className={scss.loader_user_product}></div>
            <div style={{ width: '6.2rem' }} className={scss.loader_user_product}></div>
            <div style={{ width: '3.8rem' }} className={scss.loader_user_product}></div>
          </div>
        </div>
        <div className={scss.loader_user_products_container}>
          <div className={scss.loader_user_products_container_title}></div>
          <div className={scss.loader_user_product_item}>
            <div style={{ width: '6.4rem' }} className={scss.loader_user_product}></div>
            <div style={{ width: '3.6rem' }} className={scss.loader_user_product}></div>
            <div style={{ width: '5.3rem' }} className={scss.loader_user_product}></div>
          </div>
          <div className={scss.loader_user_product_item}>
            <div style={{ width: '3.6rem' }} className={scss.loader_user_product}></div>
            <div style={{ width: '8.6rem' }} className={scss.loader_user_product}></div>
            <div style={{ width: '6.2rem' }} className={scss.loader_user_product}></div>
          </div>
          <div className={scss.loader_user_product_item}>
            <div style={{ width: '4.6rem' }} className={scss.loader_user_product}></div>
            <div style={{ width: '8.2rem' }} className={scss.loader_user_product}></div>
            <div style={{ width: '6.3rem' }} className={scss.loader_user_product}></div>
          </div>
        </div>
      </div>
    </main>
  )
}