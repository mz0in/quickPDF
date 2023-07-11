import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconReload } from '../icons'

export default function ReloadButton({ onClickFunction }: any): JSX.Element {
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'
  return (
    <ActionIcon
      size="lg"
      variant={'gradient'}
      gradient={
        dark ? { from: 'gray', to: 'gray', deg: 45 } : { from: 'black', to: 'gray', deg: 45 }
      }
      onClick={onClickFunction}
    >
      <IconReload />
    </ActionIcon>
  )
}
