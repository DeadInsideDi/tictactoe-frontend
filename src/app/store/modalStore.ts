import { create } from 'zustand'

interface ModalState {
	isCalendarOpen: boolean
	isProfileOpen: boolean
	isRemoveFriendOpen: boolean
	isAcceptMatchOpen: boolean
	isLeaveMatchOpen: boolean

	actions: {
		setIsCalendarOpen: (isOpen: boolean) => void
		setIsProfileOpen: (isOpen: boolean) => void
		setIsRemoveFriendOpen: (isOpen: boolean) => void
		setIsAcceptMatchOpen: (isOpen: boolean) => void
		setIsLeaveMatchOpen: (isOpen: boolean) => void
		// open
		openCalendar: () => void
		openProfile: () => void
		openRemoveFriend: () => void
		openAcceptMatch: () => void
		openLeaveMatch: () => void
		// close
		closeCalendar: () => void
		closeProfile: () => void
		closeRemoveFriend: () => void
		closeAcceptMatch: () => void
		closeLeaveMatch: () => void
		// toggle
		toggleCalendar: () => void
		toggleProfile: () => void
		toggleRemoveFriend: () => void
		toggleAcceptMatch: () => void
		toggleLeaveMatch: () => void

		closeAll: () => void
	}
}

export const useModalStore = create<ModalState>((set, get) => ({
	isCalendarOpen: false,
	isProfileOpen: false,
	isRemoveFriendOpen: false,
	isAcceptMatchOpen: false,
	isLeaveMatchOpen: false,

	actions: {
		setIsCalendarOpen: isCalendarOpen => set({ isCalendarOpen }),
		setIsProfileOpen: isProfileOpen => set({ isProfileOpen }),
		setIsRemoveFriendOpen: isRemoveFriendOpen => set({ isRemoveFriendOpen }),
		setIsAcceptMatchOpen: isAcceptMatchOpen => set({ isAcceptMatchOpen }),
		setIsLeaveMatchOpen: isLeaveMatchOpen => set({ isLeaveMatchOpen }),

		openCalendar: () => get().actions.setIsCalendarOpen(true),
		openProfile: () => get().actions.setIsProfileOpen(true),
		openRemoveFriend: () => get().actions.setIsRemoveFriendOpen(true),
		openAcceptMatch: () => get().actions.setIsAcceptMatchOpen(true),
		openLeaveMatch: () => get().actions.setIsLeaveMatchOpen(true),

		closeCalendar: () => get().actions.setIsCalendarOpen(false),
		closeProfile: () => get().actions.setIsProfileOpen(false),
		closeRemoveFriend: () => get().actions.setIsRemoveFriendOpen(false),
		closeAcceptMatch: () => get().actions.setIsAcceptMatchOpen(false),
		closeLeaveMatch: () => get().actions.setIsLeaveMatchOpen(false),

		toggleCalendar: () => {
			const { actions, isCalendarOpen } = get()
			actions.setIsCalendarOpen(!isCalendarOpen)
		},
		toggleProfile: () => {
			const { actions, isProfileOpen } = get()
			actions.setIsProfileOpen(!isProfileOpen)
		},
		toggleRemoveFriend: () => {
			const { actions, isRemoveFriendOpen } = get()
			actions.setIsRemoveFriendOpen(!isRemoveFriendOpen)
		},
		toggleAcceptMatch: () => {
			const { actions, isAcceptMatchOpen } = get()
			actions.setIsAcceptMatchOpen(!isAcceptMatchOpen)
		},
		toggleLeaveMatch: () => {
			const { actions, isLeaveMatchOpen } = get()
			actions.setIsLeaveMatchOpen(!isLeaveMatchOpen)
		},

		closeAll: () => {
			const {
				setIsCalendarOpen,
				setIsProfileOpen,
				setIsRemoveFriendOpen,
				setIsAcceptMatchOpen,
				setIsLeaveMatchOpen,
			} = get().actions
			setIsCalendarOpen(false)
			setIsProfileOpen(false)
			setIsRemoveFriendOpen(false)
			setIsAcceptMatchOpen(false)
			setIsLeaveMatchOpen(false)
		},
	},
}))
