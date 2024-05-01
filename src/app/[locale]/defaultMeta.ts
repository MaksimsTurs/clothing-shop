import type { Metadata } from "next";

export default function defaultMetadata(otherMeta?: Metadata): Metadata {
  return {
    robots: { follow: true, index: true },
    appleWebApp: { capable: true, statusBarStyle: "black" },
    authors: [{name: 'Maksims Turs'}],
    creator: "Maksims Turs",
    publisher: "Vercel",
    ...otherMeta
  }
}