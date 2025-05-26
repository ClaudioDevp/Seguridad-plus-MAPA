import type { ReactNode } from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'

interface Props {
  children: ReactNode
}

export default function RoutesWithNotFound({ children }: Props) {
  return (
    <Routes>
      {children}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
