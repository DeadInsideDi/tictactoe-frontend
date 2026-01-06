import {
	AuthProvider,
	GameProvider,
	ModalProvider,
	QueryProvider,
} from '@/app/providers'
import { queryClient } from '@/shared/api/queryClient'
import { type FC, type PropsWithChildren } from 'react'

export const RootLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<QueryProvider client={queryClient}>
			<AuthProvider>
				<GameProvider>
					<ModalProvider>{children}</ModalProvider>
				</GameProvider>
			</AuthProvider>
		</QueryProvider>
	)
}
