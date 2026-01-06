import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface OnboardingState {
	currentSlideIndex: number
	totalSlides: number
	isCompleted: boolean

	next: () => void
	back: () => void
	goToSlide: (index: number) => void
	reset: () => void
}

export const useOnboardingStore = create<OnboardingState>()(
	persist(
		(set, get) => ({
			currentSlideIndex: 0,
			totalSlides: 3,
			isCompleted: false,

			next: () => {
				const { currentSlideIndex, totalSlides } = get()
				const newIndex = currentSlideIndex + 1
				if (newIndex < totalSlides) {
					set({ currentSlideIndex: newIndex })
				} else {
					set({ isCompleted: true })
				}
			},

			back: () => {
				const { currentSlideIndex } = get()
				if (currentSlideIndex > 0) {
					set({ currentSlideIndex: currentSlideIndex - 1 })
				}
			},

			goToSlide: (index: number) => {
				const { totalSlides } = get()
				if (index >= 0 && index < totalSlides) {
					set({ currentSlideIndex: index })
				}
			},

			reset: () => {
				set({ currentSlideIndex: 0, isCompleted: false })
			},
		}),
		{
			name: 'onboarding-storage',
		},
	),
)
