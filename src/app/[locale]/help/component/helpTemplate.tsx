import scss from '../scss/helpTemplate.module.scss'

import type { WrapperHelpProps } from '../page.type'

import getTranslation from '@/localization/server'

export default async function HelpTemplate({ wrapperTitle, requirementTitle, requirements, indexing }: WrapperHelpProps) {
  const t = await getTranslation('help-page')

  return(
    <section className={scss.wrapper_container}>
      <div className={scss.wrapper_title}>{wrapperTitle}</div>
      <div>
        <ul>
          <li>{requirementTitle}</li>
          {requirements.map((text, index) => <li key={text}>{indexing ? `${(index + 1)})` : null} {text}</li>)}
        </ul>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=maksims07turs@gmail.com">{t('send')}</a>
      </div>
    </section>
  )
}