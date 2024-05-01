import HelpTemplate from "./component/helpTemplate"

import { Fragment } from "react"
import { CodeXml, Languages } from "lucide-react"

import type { Metadata } from "next"

import defaultMetadata from "../defaultMeta"
import getTranslation from "@/localization/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslation('metadata-help')

  return {
    ...defaultMetadata({
      keywords: [t('keyword-1'), t('keyword-2')]
    }),
    title: t('title'),
    description: t('description')
  }
}

export default async function Help() {
  const t = await getTranslation('help-page')

  return(
    <main style={{ alignItems: 'center', gap: '1rem', padding: '0.85rem' }}>
      <HelpTemplate 
        indexing 
        wrapperTitle={
          <Fragment>
            <CodeXml />
            <p>{t('title-website-error')}</p>
          </Fragment>}
        requirementTitle={t('requirement-title-error')}
        requirements={[t("error-req-1"), t("error-req-2"), t('error-req-3')]}/>
      <HelpTemplate 
        wrapperTitle={
          <Fragment>
            <Languages />
            <p>{t('title-translation')}</p>
          </Fragment>}
        requirementTitle={t('requirement-title-translation')}
        requirements={[t('example-1'), t('example-2'), t('example-3')]}/>
    </main>
  )
}