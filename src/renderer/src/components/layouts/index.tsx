import { Container } from '@mantine/core'
import { ReactNode } from 'react'
import Header from './Header'

interface props {
  children: ReactNode
  size?: string
  isBack?: boolean
}

export default function Layout({ children, size = 'xl', isBack = false }: props) {
  return (
    <>
      <Header isBack={isBack} />
      <Container size={size}>{children}</Container>
    </>
  )
}
