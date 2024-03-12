import type { Metadata } from "next";

const getDefaultMeta = (): Metadata => ({ robots: { follow: true, index: true }, creator: 'Maksims Turs', authors: [{ name: 'Maksims Turs' }], publisher: 'Vercel' })

export default getDefaultMeta