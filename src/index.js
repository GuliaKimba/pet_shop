import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
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
import { FilterContextProvider } from './components/FilterContext/FilterContextProvider'
import { Cart } from './components/Pages/Cart/Cart'
import { store } from './redux/store'
import { ProductPage } from './components/Pages/ProductPage/ProductPage'

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
      {
        path: 'cart/',
        element: <Cart />,
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
    path: 'product/:name',
    element: <ProductPage />,
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
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <FilterContextProvider>
          <RouterProvider router={router} />
        </FilterContextProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
