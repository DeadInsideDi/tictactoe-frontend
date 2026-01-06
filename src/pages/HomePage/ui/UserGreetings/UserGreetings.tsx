'use client'

import { useMeQuery } from '@/entities/user'
import { Typography } from '@/shared/ui'
import { type FC } from 'react'
import s from './UserGreetings.module.scss'

export const UserGreetings: FC = () => {
	const { data: user } = useMeQuery()

	return (
		<div className={s.greetings}>
			<Typography variant='subtitle1'>Welcome</Typography>
			<Typography variant='header1'>{user?.name}</Typography>
		</div>
	)
}
