import scss from '../scss/userDataWrapper.module.scss'

import type { PropsWithChildren } from 'react';

export default function UserDataWrapper({ children, title, icon }: PropsWithChildren<{ title?: string, icon?: any }>) {
  return(
    <div className={scss.user_wrapper_container}>
      {title ? 
        <section>
          {icon}
          <h4>{title}</h4>
        </section> : null}
      {children}
    </div>
  )
}