import LoginPage from '@renderer/pages/Login'
import { useEffect, useState } from 'react'
import Dashboard from '@renderer/pages/Dashboard'
import { LoadingOverlay } from '@mantine/core'

export default function App(): JSX.Element {
  const [isLogin, setIsLogin] = useState<boolean | string>(false)

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('user')
    if (userFromLocalStorage !== null) {
      setIsLogin(true)
    }
  }, [isLogin])

  if (isLogin === true) {
    return <Dashboard />
  }

  if ((isLogin as boolean) === false) {
    return <LoginPage loginHook={setIsLogin} />
  }

  return <LoadingOverlay visible={true} />
}
