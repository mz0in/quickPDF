import { LazyMotion, m, domAnimation } from 'framer-motion'

interface AnimationPageProps {
  children: JSX.Element
}

/**
 * Component for wrapping children with framer-motion animations using LazyMotion and m.div.
 * @param {AnimationPageProps} props - The props for the AnimationPage component.
 * @returns {JSX.Element} The AnimationPage component.
 */
export default function AnimationPage({ children }: AnimationPageProps): JSX.Element {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}
