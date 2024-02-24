import scss from './productLoader.module.scss'

export default function ProductLoader() {
  return(
    <div className={scss.product_loader_container}>
      <div className={scss.product_loader_img_container}>
        <div className={scss.product_loader_imgs_container}>
          <div className={`${scss.product_loader_img} ${scss.product_loader_style}`}></div>
          <div className={`${scss.product_loader_img} ${scss.product_loader_style}`}></div>
          <div className={`${scss.product_loader_img} ${scss.product_loader_style}`}></div>
        </div>
        <div className={`${scss.product_loader_curr_img} ${scss.product_loader_style}`}></div>
      </div>
      <div className={scss.product_loader_data_container}>
        <div className={`${scss.product_loader_big} ${scss.product_loader_style}`}></div>
        <div className={`${scss.product_loader_small} ${scss.product_loader_style}`}></div>
        <div className={`${scss.product_loader_medium} ${scss.product_loader_style}`}></div>
        <div className={`${scss.product_loader_big} ${scss.product_loader_style}`}></div>
        <div className={`${scss.product_loader_big} ${scss.product_loader_style}`}></div>
      </div>
    </div>
  )
}