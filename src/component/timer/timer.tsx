'use client'

import scss from './timer.module.scss'

import { useEffect, useState } from 'react'

import type { ExpiredState, TimerProps } from './timer.type'

import formatNumber from '@/util/formatNumber'

export default function Timer({ expiredAt }: TimerProps) {
	const [expiredTime, setExpiredTime] = useState<ExpiredState>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

	useEffect(() => {
		const time: number = Date.parse(expiredAt) - Date.now()

		const renderTime = (): void => {
			setExpiredTime(prev => ({...prev, days: Math.floor(time / (1000 * 60 * 60 * 24))}))
			setExpiredTime(prev => ({...prev, hours: Math.floor((time / (1000 * 60 * 60)) % 24)}))
			setExpiredTime(prev => ({...prev, minutes: Math.floor((time / 1000 / 60) % 60)}))
			setExpiredTime(prev => ({...prev, seconds: Math.floor((time / 1000) % 60)}))
		}

		const intervalID = setInterval(() => renderTime(), 1000)

		if(time < 0) clearInterval(intervalID)
	}, [expiredTime.seconds])

	return (
		<p className={scss.timer_end_date}>
			{formatNumber(expiredTime.days)}:
			{formatNumber(expiredTime.hours)}:
			{formatNumber(expiredTime.minutes)}:
			{formatNumber(expiredTime.seconds)}
		</p>
	)
}
