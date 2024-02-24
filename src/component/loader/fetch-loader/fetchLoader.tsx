import scss from './fetchLoader.module.scss'

export default function FetchLoader() {
  return(
    <div className={scss.fetch_loader_container}>
				<span className={scss.load_loader}></span>
    </div>
  )
}