import { useState, useEffect } from 'react'

export const useAdminChecker = (): boolean[] => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') as string)
    if (user.admin === true) {
      setIsAdmin(true)
    }
  }, [])

  return [isAdmin]
}
