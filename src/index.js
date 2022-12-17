import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App'
import { Main } from './components/Pages/Main/Main'
import { Auth } from './components/Pages/Auth/Auth'
import { SingUp } from './components/Pages/Auth/SingUp'
import { Test } from './components/Pages/Test'
import { PrivateRoute, PrivateToken } from './PrivateRoute/index'
import { SingInForm } from './components/Form/FormSingIn'
import { SingIn } from './components/Pages/Auth/SingIn'
import { Profile } from './components/Pages/UserPage/Profile'

const queryClient = new QueryClient()

const isMyToken = JSON.parse(localStorage.getItem('token'))
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile/',
        element: <Profile />,
      },
    ],
  },
  {
    path: 'auth/',
    element: <Auth />,
  },
  {
    path: 'singup/',
    element: <SingUp />,
  },
  {
    path: 'singin/',
    element: (
      <PrivateToken>
        <SingIn isMyToken={isMyToken} />
      </PrivateToken>
    ),
  },

  {
    path: 'singintest/',
    element: <SingInForm />,
  },
  {
    path: 'test/',
    element: <Test />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
