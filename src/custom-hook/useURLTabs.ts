import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import tabs from "@/app/[locale]/admin/tabs";

type Location = 'product' | 'category' | 'order' | 'user'

export default function useURLTabs() {
  const [tab, changeTab] = useState(tabs['product'].listComponent)

  const router = useRouter()

  const searchParams = useSearchParams()

  const location = searchParams.get('location') as Location | undefined
  const tabName = searchParams.get('tab') as Location | undefined

  const changeURL = (newURL: string): void => router.push(newURL)

  useEffect(() => {
    if(tabName) return changeTab(tabs[tabName].listComponent)
    if(location) return changeTab(tabs[location].dataComponent)
    else return changeTab(tabs['product'].listComponent)
  }, [location, tabName])

  return { tab, changeURL }
}