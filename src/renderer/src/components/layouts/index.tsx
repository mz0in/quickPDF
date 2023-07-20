import { Container, useMantineColorScheme } from '@mantine/core'
import { ReactNode } from 'react'
import Header from './Header'
import FormLayout from './FormLayout'
import AnimationPage from './AnimatedView'

interface LayoutProps {
  /**
   * The content to be rendered inside the layout.
   */
  children: ReactNode
  /**
   * The size of the container. Defaults to 'xl'.
   */
  size?: string
  /**
   * Flag to determine if a back button should be displayed in the header.
   */
  isBack?: boolean
}

/**
 * Layout component that wraps the content with a header and container.
 * @param {LayoutProps} props - The props for the Layout component.
 * @returns {JSX.Element} The Layout component.
 */
export function Layout({ children, size = 'xl', isBack = false }: LayoutProps): JSX.Element {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <AnimationPage>
      <>
        {/* Header component with navigation options */}
        <Header isBack={isBack} dark={dark} toggleColorScheme={toggleColorScheme} />
        {/* Container to wrap the children */}
        <Container size={size}>{children}</Container>
      </>
    </AnimationPage>
  )
}

export { FormLayout }
