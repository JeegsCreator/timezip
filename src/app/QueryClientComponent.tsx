'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '@/queryClient'
import { ReactNode } from 'react'

const QueryClientComponent = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryClientComponent
