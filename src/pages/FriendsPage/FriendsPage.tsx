'use client'

import { PlayersList } from '@/features/player'
import { SearchIcon } from '@/shared/assets'
import { InputField, TopBar } from '@/shared/ui'
import { BottomBar } from '@/widgets/BottomBar'
import { type FC, useState } from 'react'
import s from './FriendsPage.module.scss'

export const FriendsPage: FC = () => {
	const [friendName, setFriendName] = useState('')

	return (
		<div className={s.friends}>
			<TopBar title='Friends' />
			<InputField
				value={friendName}
				onChange={e => setFriendName(e.target.value)}
				autoFocus
				id='searchFriends'
				placeholder='Search Friends'
				icon={<SearchIcon />}
			/>
			<PlayersList
				name={friendName}
				friendsOnly
			/>
			<BottomBar />
		</div>
	)
}
