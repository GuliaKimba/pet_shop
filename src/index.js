import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import { Main } from './components/Pages/Main/Main'
import { Auth } from './components/Pages/Auth/Auth'
import { SignUp } from './components/Pages/Auth/SignUp/SignUp'
import { PrivateRoute } from './PrivateRoute/index'
import { SignIn } from './components/Pages/Auth/SignIn/SignIn'
import { Profile } from './components/Pages/UserPage/Profile'
import { NotFound } from './components/Pages/NotFound/NotFound'
import { FilterContextProvider } from './components/FilterContext/FilterContextProvider'
import { Cart } from './components/Pages/Cart/Cart'
import { store } from './redux/store'
import { ProductPage } from './components/Pages/ProductPage/ProductPage'
import { Favorite } from './components/Pages/Favorite/Favorite'

import { NewProductForm } from './components/Pages/NewProductForm/NewProductForm'
import { CommentTest } from './components/Comment/CommentTest/CommentTest'
import { EditProductForm } from './components/EditProductForm/EditProductForm'
import { EditNameForm } from './components/EditNameForm/EditNameForm'
import { EditAvatarForm } from './components/EditAvatarForm/EditAvatarForm'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

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
        path: 'profile/edit',
        element: <EditNameForm />,
      },
      {
        path: 'profile/edit-avatar',
        element: <EditAvatarForm />,
      },
      {
        path: 'favorite/',
        element: <Favorite />,
      },
      {
        path: 'cart/',
        element: <Cart />,
      },
      {
        path: 'product/:_id',
        element: <ProductPage />,
      },
      {
        path: 'product/:_id/edit',
        element: <EditProductForm />,
      },
      {
        path: 'add-product',
        element: <NewProductForm />,
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
    path: '404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to='404' />,
  },
  {
    path: '/reviews',
    element: <CommentTest />,
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
