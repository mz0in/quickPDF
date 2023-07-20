import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconReload } from '../icons'

interface ReloadButtonProps {
  onClickFunction: () => void
}

/**
 * Reload button component with an icon.
 * @param {Function} onClickFunction - The function to be called when the button is clicked.
 * @returns {JSX.Element} The ReloadButton component.
 */
export default function ReloadButton({ onClickFunction }: ReloadButtonProps): JSX.Element {
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <ActionIcon
      size="lg"
      variant="gradient"
      gradient={
        dark ? { from: 'gray', to: 'gray', deg: 45 } : { from: 'black', to: 'gray', deg: 45 }
      }
      onClick={onClickFunction}
    >
      <IconReload />
    </ActionIcon>
  )
}
