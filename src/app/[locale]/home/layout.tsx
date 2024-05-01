import Footer from "@/component/footer/footer";
import Header from "@/component/header/header";

import type { Metadata } from "next";

import { Fragment, type PropsWithChildren } from "react";

import defaultMetadata from "../defaultMeta";
import getTranslation from "@/localization/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslation('metadata-home')
  
  return {
    ...defaultMetadata({
      category: t('category'),
      keywords: [t('keyword-1'), t("keyword-2"), t('keyword-3')]
    }),
    description: t('description'), 
    title:  t('title') 
  }
}

export default function Layout({ children }: PropsWithChildren) {
  return(
    <Fragment>
      <Header/>
      {children}
      <Footer/>
    </Fragment>
  )
}