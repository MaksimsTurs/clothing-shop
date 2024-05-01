import { Fragment, type PropsWithChildren } from "react";

import type { Metadata } from "next";

import Footer from "@/component/footer/footer";
import Header from "@/component/header/header";
import defaultMeta from "../defaultMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {...defaultMeta, title: 'Cart' }
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