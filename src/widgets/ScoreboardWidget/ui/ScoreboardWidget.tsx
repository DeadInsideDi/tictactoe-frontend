'use client'

import { ScoreboardList } from '@/features/player'
import { BackIcon } from '@/shared/assets'
import { ROUTE_PAGES } from '@/shared/config'
import { Typography } from '@/shared/ui'
import { type FC } from 'react'
import { useNavigate } from 'react-router'
import s from './ScoreboardWidget.module.scss'

export const ScoreboardWidget: FC = () => {
	const navigate = useNavigate()

	return (
		<section
			tabIndex={0}
			role='link'
			aria-label='Scoreboard'
			className={s.widget}
			onClick={() => navigate(ROUTE_PAGES.SCOREBOARD)}
			onKeyDown={e => e.key === 'Enter' && navigate(ROUTE_PAGES.GAME_HISTORY)}
		>
			<Typography
				variant='subtitle1'
				className={s.title}
			>
				Scoreboard
				<BackIcon />
			</Typography>
			<ScoreboardList />
		</section>
	)
}
