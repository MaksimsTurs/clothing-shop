import scss from './smallLoader.module.scss'

export default function SmallLoader() {
  return(
    <div className={scss.fetch_loader_container}>
				<span className={scss.load_loader}></span>
    </div>
  )
}