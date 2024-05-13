import Footer from "@/component/footer/footer";
import Header from "@/component/header/header";
import { Fragment, type PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return(
    <Fragment>
      <Header/>
      <main style={{ padding: '1rem 3rem', alignItems: 'center', justifyContent: 'center' }}>{children}</main>
      <Footer/>
    </Fragment>
  )
}