'use client'

import { PlayersList } from '@/features/player'
import { SearchIcon } from '@/shared/assets'
import { InputField, TopBar } from '@/shared/ui'
import { BottomBar } from '@/widgets/BottomBar'
import { useState, type FC } from 'react'
import s from './OnlinePage.module.scss'

export const OnlinePage: FC = () => {
	const [playerName, setPlayerName] = useState('')

	return (
		<div className={s.online}>
			<TopBar title='Online Players' />
			<InputField
				value={playerName}
				onChange={e => setPlayerName(e.target.value)}
				autoFocus
				id='searchPlayers'
				placeholder='Search Players'
				icon={<SearchIcon />}
			/>
			<PlayersList
				name={playerName}
				onlineOnly={true}
			/>

			<BottomBar />
		</div>
	)
}
