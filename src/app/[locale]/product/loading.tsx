import scss from './scss/loading.module.scss'

export default function Loading() {
  return(
    <div className={scss.loading_container}>
      <div className={`${scss.loading_def_style} ${scss.loading_big_img}`}></div>
      <div className={scss.loading_text_container}>
        <div style={{ width: '14rem' }} className={`${scss.loading_def_style} ${scss.loading_text}`}></div>
        <div style={{ width: '13rem' }} className={`${scss.loading_def_style} ${scss.loading_text}`}></div>
        <div style={{ width: '12rem' }} className={`${scss.loading_def_style} ${scss.loading_text}`}></div>
        <div style={{ width: '14rem' }} className={`${scss.loading_def_style} ${scss.loading_text}`}></div>
        <div style={{ width: '14.5rem' }} className={`${scss.loading_def_style} ${scss.loading_text}`}></div>
        <div style={{ width: '12.5rem' }} className={`${scss.loading_def_style} ${scss.loading_text}`}></div>
      </div>
    </div>
  )
}