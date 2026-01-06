'use client'

import { useOnboardingStore } from '@/app/store'
import { cn } from '@/shared/lib'
import { Typography } from '@/shared/ui'
import { type FC } from 'react'
import s from './OnboardingNavigation.module.scss'

export const OnboardingNavigation: FC = () => {
	const { currentSlideIndex, totalSlides, goToSlide, next, back } =
		useOnboardingStore()

	return (
		<div className={s.navigation}>
			<button
				className={s.back}
				onClick={back}
				disabled={currentSlideIndex === 0}
			>
				<Typography variant='body1'>Back</Typography>
			</button>
			<div className={s.dots}>
				{Array.from({ length: totalSlides }).map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						aria-current={currentSlideIndex === index}
						tabIndex={currentSlideIndex === index ? -1 : 0}
						className={cn(s.dot, currentSlideIndex === index && s.dotActive)}
					></button>
				))}
			</div>
			<button
				className={s.next}
				onClick={next}
			>
				<Typography variant='body1M'>Next</Typography>
			</button>
		</div>
	)
}
