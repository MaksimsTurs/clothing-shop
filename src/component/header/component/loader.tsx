import scss from '../scss/loader.module.scss'

export function NavigationListLoader() {
  return(
    <div className={scss.loader_container}>
      <div className={scss.loader_body}></div>
      <div className={scss.loader_body}></div>
      <div className={scss.loader_body}></div>
    </div>
  )
}

export function UserAvatarLoader() {
  return(
    <div className={scss.loader_user_avatar}>

    </div>
  )
}