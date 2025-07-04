import { Fragment, type PropsWithChildren } from "react";

import Header from "@/component/header/header";
import Footer from "@/component/footer/footer";

export const fetchCache = 'force-no-store';

export default function Layout({ children }: PropsWithChildren) {
  return(
    <Fragment>
      <Header/>
      {children}
      <Footer/>
    </Fragment>
  )
}