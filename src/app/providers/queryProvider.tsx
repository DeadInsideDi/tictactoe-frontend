import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { FC, ReactNode } from 'react'

type QueryProviderProps = {
	children: ReactNode
	client: QueryClient
}

export const QueryProvider: FC<QueryProviderProps> = ({ client, children }) => {
	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
