import Footer from "@/component/footer/footer";
import Header from "@/component/header/header";

import { Fragment, type PropsWithChildren } from "react";

import defaultMetadata from "../defaultMeta";

import type { Metadata } from "next";
import getTranslation from "@/localization/server";

export const fetchCache = 'force-no-store';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslation('metadata-search')
  return { 
    ...defaultMetadata({
      keywords: [t('keyword-1'), t('keyword-2')]
    }), 
    title: t('title') }
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