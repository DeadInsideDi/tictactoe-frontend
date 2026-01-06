import { type FC } from 'react'
import { Outlet } from 'react-router'
import s from './Layout.module.scss'

export const Layout: FC = () => {
	return (
		<>
			<div className={s.layout}>Layout</div>
			<Outlet />
		</>
	)
}
