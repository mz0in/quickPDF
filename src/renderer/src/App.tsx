import LoginPage from '@renderer/pages/Login'
import { useEffect, useState } from 'react'
import { auth } from '@renderer/services/firebase'
import Dashboard from '@renderer/pages/Dashboard'
import { LoadingOverlay } from '@mantine/core'

export default function App(): JSX.Element {
  const [isLogin, setIsLogin] = useState<boolean | string>('')

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      if (user) {
        setIsLogin(true)
      } else {
        console.log(user)
      }
    })
    let userFromLocalStorage = localStorage.getItem('user')
    if (userFromLocalStorage !== null) {
      setIsLogin(true)
    }
  }, [])

  if (isLogin === true) {
    return <Dashboard />
  }

  if ((isLogin as boolean) !== true) {
    return <LoginPage />
  }

  return <LoadingOverlay visible={true} />
}
