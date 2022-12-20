import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App'
import { Main } from './components/Pages/Main/Main'
import { Auth } from './components/Pages/Auth/Auth'
import { SignUp } from './components/Pages/Auth/SignUp'
import { Test } from './components/Pages/Test'
import { PrivateRoute } from './PrivateRoute/index'
import { SingInForm } from './components/Form/FormSingIn'
import { SignIn } from './components/Pages/Auth/SignIn'
import { Profile } from './components/Pages/UserPage/Profile'
import { NotFound } from './components/Pages/NotFound/NotFound'

const queryClient = new QueryClient()

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
    path: 'signup/',
    element: <SignUp />,
  },
  {
    path: 'signin/',
    element: <SignIn />,
  },

  {
    path: 'singintest/',
    element: <SingInForm />,
  },
  {
    path: 'test/',
    element: <Test />,
  },
  {
    path: '404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to='404' />,
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
