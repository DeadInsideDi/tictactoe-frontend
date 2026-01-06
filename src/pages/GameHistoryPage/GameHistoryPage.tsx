'use client'

import { CalendarButton } from '@/features/calendar'
import { GameHistoryBigList } from '@/features/game'
import { BackIcon } from '@/shared/assets'
import { ROUTE_PAGES } from '@/shared/config'
import { TopBar } from '@/shared/ui'
import { type FC } from 'react'
import s from './GameHistoryPage.module.scss'

export const GameHistoryPage: FC = () => {
	return (
		<div className={s.history}>
			<TopBar
				icon={<BackIcon />}
				title='Game History'
				to={ROUTE_PAGES.HOME}
			/>
			<CalendarButton />
			<GameHistoryBigList />
		</div>
	)
}
