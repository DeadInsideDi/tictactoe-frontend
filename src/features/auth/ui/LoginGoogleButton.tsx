'use client'

import { loginAuthByGoogle } from '@/entities/auth'
import { GoogleIcon } from '@/shared/assets'
import { Button } from '@/shared/ui'
import { type FC } from 'react'

export const LoginGoogleButton: FC = () => {
	return (
		<Button
			onClick={loginAuthByGoogle}
			icon={<GoogleIcon />}
			variant='outlined'
		>
			Sign in with Google
		</Button>
	)
}
