'use client'

import scss from '../page.module.scss'

import { useState } from "react";

import type { DescriptionProps } from "../page.type";

export default function Description({ text }: DescriptionProps) {
  const [isExpanded, setExpanded] = useState(!(text.length >= 200))

  const expandDescription = (): void => setExpanded(prev => !prev)

  const toMuch: boolean = text.length >= 200

  return(
    <section className={scss.product_description}>
      {isExpanded ? text : text.slice(0, 200)}
      {toMuch ? <button className={scss.product_description_expand} onClick={expandDescription}>
        <svg viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/></svg>
      </button> : null}
    </section>
  )
}