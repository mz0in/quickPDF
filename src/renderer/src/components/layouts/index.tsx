import { Container, useMantineColorScheme } from '@mantine/core'
import { ReactNode } from 'react'
import Header from './Header'
import FormLayout from './FormLayout'

interface props {
  children: ReactNode
  size?: string
  isBack?: boolean
}

export function Layout({ children, size = 'xl', isBack = false }: props) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  console.log(colorScheme, toggleColorScheme)
  return (
    <>
      <Header isBack={isBack} dark={dark} toggleColorScheme={toggleColorScheme}/>
      <Container size={size}>{children}</Container>
    </>
  )
}

export { FormLayout }
