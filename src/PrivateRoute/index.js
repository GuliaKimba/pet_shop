import { useState, useEffect } from 'react'

import { Navigate } from 'react-router-dom'

export function PrivateRoute({ children }) {
  const getToken = JSON.parse(localStorage.getItem('token'))

  return getToken ? children : <Navigate to='/auth' />
}
export function PrivateToken({ children }) {
  const [user, setUser] = useState(false)
  const getToken = JSON.parse(localStorage.getItem('token'))
  useEffect(() => {
    if (getToken) {
      setUser(true)
    }
  })

  return !user ? children : <Navigate to='/test' />
}
