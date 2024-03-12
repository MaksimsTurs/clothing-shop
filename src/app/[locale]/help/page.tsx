import getTranslation from "@/i18n/server"
import HelpTemplate from "./component/helpTemplate"

import getDefaultMeta from "@/util/getDefaultMeta"

import  type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
	const tr = await getTranslation('Head')
	return {...getDefaultMeta(), title: tr('search.title'), description: tr('search.description') }
}

export default async function Help() {
  const tr = await getTranslation("Help")

  return(
    <main>
      <HelpTemplate 
        indexing 
        wrapperTitle={tr("website-help")}
        requirementTitle={tr("useful-data")}
        requirements={[tr("1w"), tr("2w"), tr("3w"), tr("5w")]}/>
      <HelpTemplate 
        wrapperTitle={tr("translation-help")}
        requirementTitle={tr("example-title")}
        requirements={[tr("1t"), tr("2t"), tr("3t"), tr("4t"), tr("5t")]}/>
    </main>
  )
}