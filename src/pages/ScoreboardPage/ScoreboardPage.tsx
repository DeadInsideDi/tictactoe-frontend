'use client'

import { ScoreboardBigList } from '@/features/player'
import { BackIcon, SearchIcon } from '@/shared/assets'
import { ROUTE_PAGES } from '@/shared/config'
import { InputField, TopBar } from '@/shared/ui'
import { useState, type FC } from 'react'
import s from './ScoreboardPage.module.scss'

export const ScoreboardPage: FC = () => {
	const [playerName, setPlayerName] = useState('')

	return (
		<div className={s.scoreboard}>
			<TopBar
				icon={<BackIcon />}
				title='Scoreboard'
				to={ROUTE_PAGES.HOME}
			/>
			<InputField
				value={playerName}
				onChange={e => setPlayerName(e.target.value)}
				autoFocus
				id='playerName'
				placeholder='Player Name'
				icon={<SearchIcon />}
			/>
			<ScoreboardBigList name={playerName} />
		</div>
	)
}
