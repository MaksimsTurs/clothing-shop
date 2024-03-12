import scss from '../scss/helpTemplate.module.scss'

import type { WrapperHelpProps } from '../help.type'

import getTranslation from '@/i18n/server'

export default async function HelpTemplate({ wrapperTitle, requirementTitle, requirements, indexing }: WrapperHelpProps) {
  const tr = await getTranslation("Help")
  return(
    <section className={scss.wrapper_container}>
      <h4 className={scss.wrapper_title}>{wrapperTitle}</h4>
      <div className={scss.wrapper_body}>
        <ul>
          <li>{requirementTitle}</li>
          {requirements.map((text, index) => <li>{indexing ? `${(index + 1)})` : null} {text}</li>)}
        </ul>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=maksims07turs@gmail.com">{tr("send-email")}</a>
      </div>
    </section>
  )
}