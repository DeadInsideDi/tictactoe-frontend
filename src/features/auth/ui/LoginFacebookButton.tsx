'use client'

import { loginAuthByFacebook } from '@/entities/auth'
import { FacebookIcon } from '@/shared/assets'
import { Button } from '@/shared/ui'
import { type FC } from 'react'

export const LoginFacebookButton: FC = () => {
	return (
		<Button
			onClick={loginAuthByFacebook}
			icon={<FacebookIcon />}
			variant='outlined'
		>
			Sign in with Facebook
		</Button>
	)
}
