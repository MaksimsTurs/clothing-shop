import Footer from "@/component/footer/footer";
import Header from "@/component/header/header";

import type { Metadata } from "next";

import { Fragment, type PropsWithChildren } from "react";

import defaultMetadata from "../defaultMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {...defaultMetadata(), title: 'Registration' }
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