import scss from './productLoader.module.scss'

export default function ProductLoader() {
  return(
    <div className={`${scss.product_loader_container} ${scss.default_style}`}>
      <div className={scss.product_loader_img}></div>
      <div className={scss.product_loader_text_container}>
        <div className={scss.product_loader_text}></div>
        <div className={scss.product_loader_text}></div>
        <div className={scss.product_loader_text}></div>
        <div className={scss.product_loader_text}></div>
      </div>
    </div>
  )
}