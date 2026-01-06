'use client'

import { GamesIcon, HomeIcon, PeopleIcon } from '@/shared/assets'
import { ROUTE_PAGES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { type FC } from 'react'
import { Link, useLocation } from 'react-router'
import s from './BottomBar.module.scss'

export const BottomBar: FC = () => {
	const { pathname } = useLocation()
	const isHome = pathname === ROUTE_PAGES.HOME
	const isOnline = pathname === ROUTE_PAGES.ONLINE
	const isFriends = pathname === ROUTE_PAGES.FRIENDS

	return (
		<div className={s.bar}>
			<Link
				className={cn(s.btn, isHome && s.btnActive)}
				to={ROUTE_PAGES.HOME}
				tabIndex={isHome ? -1 : 0}
			>
				<HomeIcon />
			</Link>

			<Link
				className={cn(s.btn, isOnline && s.btnActive)}
				to={ROUTE_PAGES.ONLINE}
				tabIndex={isOnline ? -1 : 0}
			>
				<GamesIcon />
			</Link>

			<Link
				className={cn(s.btn, isFriends && s.btnActive)}
				to={ROUTE_PAGES.FRIENDS}
				tabIndex={isFriends ? -1 : 0}
			>
				<PeopleIcon />
			</Link>
		</div>
	)
}
