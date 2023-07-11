import { Container, useMantineColorScheme } from '@mantine/core'
import { ReactNode } from 'react'
import Header from './Header'
import FormLayout from './FormLayout'
import AnimationPage from './AnimatedView'

interface props {
  children: ReactNode
  size?: string
  isBack?: boolean
}

export function Layout({ children, size = 'xl', isBack = false }: props): JSX.Element {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'
  console.log(colorScheme, toggleColorScheme)
  return (
    <AnimationPage>
      <Header isBack={isBack} dark={dark} toggleColorScheme={toggleColorScheme} />
      <Container size={size}>{children}</Container>
    </AnimationPage>
  )
}

export { FormLayout }
