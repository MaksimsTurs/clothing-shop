'use client'

import scss from './userFormHeader.module.scss'

import type { UserFormHeaderProps } from "./userFormHeader.type";

import { UserCheck, UserRound, UserRoundX } from 'lucide-react';

export default function UserFormHeader({ isFormOk, yourself, scssClass, title }: UserFormHeaderProps) {
  return(
    <section className={`${scss.user_form_header} ${scssClass}`}>
      {(isFormOk && yourself) ? <UserCheck /> : isFormOk ? <UserRound /> : <UserRoundX />}
      <h3>{title}</h3>
    </section>
  )
}