import { Container } from '@mantine/core'
import { ReactNode } from 'react'
import Header from './Header'
import FormLayout from './FormLayout'

interface props {
  children: ReactNode
  size?: string
  isBack?: boolean
}

export function Layout({ children, size = 'xl', isBack = false }: props) {
  return (
    <>
      <Header isBack={isBack} />
      <Container size={size}>{children}</Container>
    </>
  )
}

export { FormLayout }
