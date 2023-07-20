import { useEffect, useState } from 'react'
import LoginPage from '@renderer/pages/Login'
import Dashboard from '@renderer/pages/Dashboard'
import { LoadingOverlay } from '@mantine/core'

export default function App(): JSX.Element {
  // State to track the user login status and loading state
  const [isLogin, setIsLogin] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if the user is already logged in by checking local storage
    const userFromLocalStorage = localStorage.getItem('user')
    // Simulate async checking using setTimeout to show the loading overlay
    setTimeout(() => {
      if (userFromLocalStorage !== null) {
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
    }, 2000) // Adjust the duration as needed for a real backend API call
  }, [])

  // While the user login status is being checked, show the LoadingOverlay
  if (isLogin === null) {
    return <LoadingOverlay visible={true} />
  }

  // Render the Dashboard component if the user is logged in
  if (isLogin) {
    return <Dashboard />
  }

  // Render the LoginPage component if the user is not logged in
  return <LoginPage loginHook={setIsLogin} />
}
