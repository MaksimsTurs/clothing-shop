import { useEffect, useState, JSX } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import tabs from "@/app/[locale]/admin/tabs";

type Location = Exclude<keyof typeof tabs, 'create-product' | 'create-category' | 'create-action' | 'website-settings'>
type Tabs = keyof typeof tabs

export default function useURLTabs() {
  const [tab, changeTab] = useState<{ render: JSX.Element, name: Location | Tabs }>({ name: 'product', render: tabs['product'].listComponent })

  const router = useRouter()

  const searchParams = useSearchParams()

  const location = searchParams.get('location') as Location | undefined
  const tabName = searchParams.get('tab') as Tabs | undefined

  const changeURL = (newURL: string): void => router.push(newURL)

  useEffect(() => {
    if(tabName) return changeTab({ name: tabName, render: tabs[tabName].listComponent })
    if(location) return changeTab({ name: location, render: tabs[location].dataComponent })
    else return changeTab({ name: 'product', render: tabs['product'].listComponent })
  }, [location, tabName])

  return { tab, changeURL }
}