import scss from './scss/loading.module.scss'

export default function Loading() {
  return(
    <div className={scss.loading_container}>
      <div className={scss.loading_img_container}>
        <div className={scss.loading_slider_container}>
          <div className={`${scss.default_style} ${scss.loading_small_img}`}></div>
          <div className={`${scss.default_style} ${scss.loading_small_img}`}></div>
          <div className={`${scss.default_style} ${scss.loading_small_img}`}></div>
        </div>
        <div className={`${scss.default_style} ${scss.loading_big_img}`}></div>
      </div>
      <div className={scss.loading_text_container}>
        <div style={{ width: '14rem' }} className={`${scss.default_style} ${scss.loading_text}`}></div>
        <div style={{ width: '13rem' }} className={`${scss.default_style} ${scss.loading_text}`}></div>
        <div style={{ width: '12rem' }} className={`${scss.default_style} ${scss.loading_text}`}></div>
        <div style={{ width: '14rem' }} className={`${scss.default_style} ${scss.loading_text}`}></div>
        <div style={{ width: '14.5rem' }} className={`${scss.default_style} ${scss.loading_text}`}></div>
        <div style={{ width: '12.5rem' }} className={`${scss.default_style} ${scss.loading_text}`}></div>
      </div>
    </div>
  )
}