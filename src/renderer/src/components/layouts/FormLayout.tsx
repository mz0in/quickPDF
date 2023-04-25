import { Title, Paper } from '@mantine/core'

interface FormLayoutProps {
  title: string
  children: JSX.Element
}

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
