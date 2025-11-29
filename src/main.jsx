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
import AddJob from './Pages/AddJob.jsx';
import PrivateRoute from './Layout/PrivateRoute.jsx';
import JobDetails from './Pages/JobDetails.jsx';
import MyAddedJobs from './Pages/MyAddedJobs.jsx';
import UpdateJob from './Pages/UpdateJob.jsx';
import MyAcceptedTasks from './Pages/MyAcceptedTasks.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { 
        index: true,
        element: <Home></Home>
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
      },
      {
        path: 'addJob',
        element:(
          <PrivateRoute>
            <AddJob></AddJob>
          </PrivateRoute>
        )
      },
      {
        path: 'jobs/:id',
        element:(
          <PrivateRoute>
            <JobDetails></JobDetails>
          </PrivateRoute>
        )
      },
       {
    path: 'my-added-jobs',
    element: (
      <PrivateRoute>
        <MyAddedJobs></MyAddedJobs>
      </PrivateRoute>
    )
    },
    {
      path:'updateJob/:id',
      element:(
        <PrivateRoute>
          <UpdateJob></UpdateJob>
        </PrivateRoute>
      )
    },
    {
      path:'my-accepted-tasks',
      element:(
        <PrivateRoute>
          <MyAcceptedTasks></MyAcceptedTasks>
        </PrivateRoute>
      )
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
  </StrictMode>
)
