'use client'

import { useMeQuery } from '@/entities/user'
import { Score } from '@/features/player'
import { BottomBar } from '@/widgets/BottomBar'
import { GameHistoryWidget } from '@/widgets/GameHistoryWidget'
import { ScoreboardWidget } from '@/widgets/ScoreboardWidget'
import { type FC } from 'react'
import s from './HomePage.module.scss'
import { UserGreetings } from './ui/UserGreetings'

export const HomePage: FC = () => {
	const { data: user } = useMeQuery()

	return (
		<div className={s.home}>
			<div className={s.profile}>
				<UserGreetings />
				<Score
					wins={user?.wins}
					losses={user?.losses}
					draws={user?.draws}
				/>
			</div>
			<GameHistoryWidget />
			<ScoreboardWidget />
			<BottomBar />
		</div>
	)
}
