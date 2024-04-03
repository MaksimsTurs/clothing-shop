import type { ServerResError } from "@/lib/fetcher/fetcher.type";

import { Fragment, type PropsWithChildren } from "react";

import Error from "@/component/error/error";
import ListLoader from "./listLoader";

export default function ErrorLoadingWrapper({ children, error, isLoading }: PropsWithChildren<{ error?: ServerResError, isLoading: boolean }>) {
  return <Fragment>{isLoading ? <ListLoader/> : error ? <Error error={error}/> : children}</Fragment>
}