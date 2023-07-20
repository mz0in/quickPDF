import { Title, Paper } from '@mantine/core'

interface FormLayoutProps {
  /**
   * The title of the form layout.
   */
  title: string
  /**
   * The children elements to be rendered within the form layout.
   */
  children: JSX.Element
}

/**
 * Component for creating a form layout with a title and paper container.
 * @param {FormLayoutProps} props - The props for the FormLayout component.
 * @returns {JSX.Element} The FormLayout component.
 */
export default function FormLayout({ title, children }: FormLayoutProps): JSX.Element {
  return (
    <>
      <Title
        align="center"
        sx={{
          fontWeight: 900
        }}
      >
        {title}
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {children}
      </Paper>
    </>
  )
}
