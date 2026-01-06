'use client'

import { useOnboardingStore } from '@/app/store'
import { debounce } from '@/shared/lib'
import { OnboardingNavigation } from '@/widgets/OnboardingNavigation'
import { useEffect, useRef, type FC } from 'react'
import { useNavigate } from 'react-router'
import s from './OnboardingPage.module.scss'
import {
	CompeteSlide,
	ScoreboardSlide,
	WelcomeSlide,
} from './ui/OnboardingSlides'

export const OnboardingPage: FC = () => {
	const currentSlideIndex = useOnboardingStore(state => state.currentSlideIndex)
	const isCompleted = useOnboardingStore(state => state.isCompleted)
	const goToSlide = useOnboardingStore(state => state.goToSlide)

	const ref = useRef<HTMLUListElement>(null)
	const navigate = useNavigate()

	useEffect(() => {
		if (!ref.current) return

		ref.current.scrollTo({
			left: ref.current.clientWidth * currentSlideIndex,
			behavior: 'smooth',
		})
	}, [currentSlideIndex])

	useEffect(() => {
		if (isCompleted) setTimeout(() => navigate('/login'), 100)
	}, [isCompleted, navigate])

	const scrollHandle = debounce((e: React.UIEvent<HTMLUListElement>) => {
		const { scrollLeft, clientWidth } = e.target as HTMLUListElement
		const newIndex = Math.round(scrollLeft / clientWidth)
		if (currentSlideIndex !== newIndex) goToSlide(newIndex)
	}, 100)

	return (
		<div className={isCompleted ? s.invisible : ''}>
			<ul
				ref={ref}
				onScroll={scrollHandle}
				className={s.slides}
				aria-label='Onboarding slides'
				tabIndex={-1}
			>
				<WelcomeSlide isActive={currentSlideIndex === 0} />
				<CompeteSlide isActive={currentSlideIndex === 1} />
				<ScoreboardSlide isActive={currentSlideIndex === 2} />
			</ul>

			<OnboardingNavigation />
		</div>
	)
}
