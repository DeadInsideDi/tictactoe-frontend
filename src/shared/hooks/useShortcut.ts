import { useEffect } from 'react'

export const useShortcut = (
	codes: string[],
	callback: (event: KeyboardEvent) => void,
) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const { target, code } = event
			const { tagName, isContentEditable } = target as HTMLElement

			const isEditing =
				tagName === 'INPUT' || tagName === 'TEXTAREA' || isContentEditable

			if (!isEditing && codes.some(c => c === code)) {
				return callback(event)
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [codes, callback])
}
