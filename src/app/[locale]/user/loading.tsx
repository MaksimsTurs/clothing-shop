import scss from './scss/loading.module.scss'

export default function Loading() {
  return(
    <div className={scss.loading_container}>
      <div className={`${scss.loading_def_style} ${scss.loading_avatar}`}></div>
      <div className={scss.loading_name_container}>
        <div className={scss.loading_name_body}>
          <div style={{ width: '10rem', height: '1.75rem' }} className={scss.loading_def_style}></div>
          <div style={{ width: '10rem', height: '1.75rem' }} className={scss.loading_def_style}></div>
        </div>
        <div style={{ width: '100%', height: '1.5rem' }} className={scss.loading_def_style}></div>
      </div>
      <div style={{ width: '21rem', height: '10rem', marginTop: '1rem' }} className={scss.loading_def_style}></div>
    </div>
  )
}