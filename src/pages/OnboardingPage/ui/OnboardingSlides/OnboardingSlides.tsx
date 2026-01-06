'use client'

import {
	OnboardingImage1,
	OnboardingImage2,
	OnboardingImage3,
} from '@/shared/assets'
import { cn } from '@/shared/lib'
import { Typography } from '@/shared/ui'
import { type FC } from 'react'
import s from './OnboardingSlides.module.scss'

type SlideProps = {
	isActive: boolean
}

export const WelcomeSlide: FC<SlideProps> = ({ isActive }) => {
	return (
		<li
			className={cn(s.slide, isActive && s.slideActive)}
			aria-current={isActive}
		>
			<OnboardingImage1 />
			<Typography variant='header2'>Welcome</Typography>
			<Typography
				variant='subtitle2'
				className={s.text}
			>
				Most fun game now available on your smartphone device!
			</Typography>
		</li>
	)
}

export const CompeteSlide: FC<SlideProps> = ({ isActive }) => {
	return (
		<li
			className={cn(s.slide, isActive && s.slideActive)}
			aria-current={isActive}
		>
			<OnboardingImage2 />
			<Typography variant='header2'>Compete</Typography>
			<Typography
				variant='subtitle2'
				className={s.text}
			>
				Play online with your friends and top the leaderboard!
			</Typography>
		</li>
	)
}

export const ScoreboardSlide: FC<SlideProps> = ({ isActive }) => {
	return (
		<li
			className={cn(s.slide, isActive && s.slideActive)}
			aria-current={isActive}
		>
			<OnboardingImage3 />
			<Typography variant='header2'>Scoreboard</Typography>
			<Typography
				variant='subtitle2'
				className={s.text}
			>
				Earn points for each game and make your way to top the scoreboard!
			</Typography>
		</li>
	)
}
