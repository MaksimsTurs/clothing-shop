'use client'

import scss from './timer.module.scss'

import { useEffect, useState } from 'react'
import { ExpiredState, TimerProps } from './timer.type'

import getFormatedValue from '@/app/[locale]/admin/helpers/getFromatedValue'

export default function Timer({ expiredDate }: TimerProps) {
	const [expiredTime, setExpiredTime] = useState<ExpiredState>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})

	useEffect(() => {
		const renderTime = () => {
			const time: number = Date.parse(expiredDate) - Date.now()

			setExpiredTime(prev => ({...prev, days: Math.floor(time / (1000 * 60 * 60 * 24))}))
			setExpiredTime(prev => ({...prev, hours: Math.floor((time / (1000 * 60 * 60)) % 24)}))
			setExpiredTime(prev => ({...prev, minutes: Math.floor((time / 1000 / 60) % 60)}))
			setExpiredTime(prev => ({...prev, seconds: Math.floor((time / 1000) % 60)}))
		}

		setInterval(() => renderTime(), 1000)
	}, [expiredTime.seconds])

	return (
		<p className={scss.timer_end_date}>
			{getFormatedValue(expiredTime.days)}:
			{getFormatedValue(expiredTime.hours)}:
			{getFormatedValue(expiredTime.minutes)}:
			{getFormatedValue(expiredTime.seconds)}
		</p>
	)
}
