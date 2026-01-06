'use client'

import { useIsAuthenticated } from '@/app/store'
import { useMeQuery } from '@/entities/user'
import {
	LoginFacebookButton,
	LoginGoogleButton,
	useProcessAuthCallback,
} from '@/features/auth'
import { LogoIcon } from '@/shared/assets'
import { LoadingProgress, RetryButton, Typography } from '@/shared/ui'
import { type FC } from 'react'
import s from './LoginPage.module.scss'

export const LoginPage: FC = () => {
	const isAuthenticated = useIsAuthenticated()
	const { isLoading, isError, refetch } = useMeQuery()
	useProcessAuthCallback()

	if (!isAuthenticated)
		return (
			<div className={s.login}>
				<div className={s.content}>
					<LogoIcon />
					<Typography variant='header2'>Welcome</Typography>
					<Typography
						variant='subtitle2'
						className={s.subtitle}
					>
						Please sign in to continue.
					</Typography>
				</div>

				<div className={s.social}>
					<LoginGoogleButton />
					<LoginFacebookButton />
				</div>
			</div>
		)

	if (isLoading)
		return (
			<div className={s.progress}>
				<LoadingProgress message='Connecting to the Server' />
			</div>
		)

	if (isError)
		return (
			<div className={s.error}>
				<Typography variant='body1'>Internet Connection Unavailable</Typography>
				<RetryButton onClick={() => refetch()}>
					<Typography variant='body1'>Try Again</Typography>
				</RetryButton>
			</div>
		)
}
