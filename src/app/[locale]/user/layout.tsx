import Footer from "@/component/footer/footer";
import Header from "@/component/header/header";

import { Fragment, type PropsWithChildren } from "react";

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