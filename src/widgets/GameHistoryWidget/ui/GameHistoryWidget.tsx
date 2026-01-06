'use client'

import { GameHistoryList } from '@/features/game'
import { BackIcon } from '@/shared/assets'
import { ROUTE_PAGES } from '@/shared/config'
import { Typography } from '@/shared/ui'
import { type FC } from 'react'
import { useNavigate } from 'react-router'
import s from './GameHistoryWidget.module.scss'

export const GameHistoryWidget: FC = () => {
	const navigate = useNavigate()

	return (
		<section
			tabIndex={0}
			role='link'
			aria-label='Game History'
			className={s.widget}
			onClick={() => navigate(ROUTE_PAGES.GAME_HISTORY)}
			onKeyDown={e => e.key === 'Enter' && navigate(ROUTE_PAGES.GAME_HISTORY)}
		>
			<Typography
				variant='subtitle1'
				className={s.title}
			>
				Game History
				<BackIcon />
			</Typography>
			<GameHistoryList />
		</section>
	)
}
