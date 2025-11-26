import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Layout/RootLayout.jsx';
import Home from './Pages/Home.jsx';
import AllJobs from './Pages/AllJobs.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import Registration from './Pages/Registration.jsx';
import Login from './Pages/Login.jsx';
import NotFound from './Pages/NotFound.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { 
        index: true,
        Component: Home
      },
      {
        path: 'allJobs',
        Component: AllJobs
      },
      {
        path: 'register',
        Component: Registration
      },
      {
        path: 'login',
        Component: Login
      }
    ]
  },
  {
    path: '*',
    element: <NotFound></NotFound>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
