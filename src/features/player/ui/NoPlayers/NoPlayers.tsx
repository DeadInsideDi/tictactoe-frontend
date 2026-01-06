'use client'

import { Typography } from '@/shared/ui'
import { type FC } from 'react'
import s from './NoPlayers.module.scss'

type NoPlayersProps = {
	friendsMode?: boolean
}

export const NoPlayers: FC<NoPlayersProps> = ({ friendsMode }) => {
	return (
		<div className={s.texts}>
			<Typography variant='subtitle1M'>
				{friendsMode ? 'No Friends' : 'No Players Online'}
			</Typography>
			<Typography variant='body1'>
				{friendsMode ? 'Add new friends.' : 'Please come again later.'}
			</Typography>
		</div>
	)
}
