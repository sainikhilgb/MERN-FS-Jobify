import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { HomeLayout,
  LandingPage,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  AllJobs,
  Profile,
  Stats,
  Admin,
  EditJob
} from './pages'
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { action as addJobs } from './pages/AddJob';
import { loader as  allJobsLoader} from './pages/AllJobs';
import { loader as  editJobsLoader} from './pages/EditJob';
import { action as editJobsAction } from './pages/EditJob';
import { action as deleteJobsAction } from './pages/DeleteJob';
import { loader as  adminJobsLoader} from './pages/Admin';
import { action as profileAction } from './pages/Profile';
import { loader as  statsLoader} from './pages/Stats';


export const checkDefaultTheme = ()=>{
  const isDarkTheme = localStorage.getItem('darkTheme')=== "true"
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme
}

checkDefaultTheme()

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement:<Error></Error>,
    children:[
      {
        index:true,
        element: <LandingPage></LandingPage>
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children:[
          {
            index:true,
            element: <AddJob></AddJob>,
            action:addJobs
          },
          {
            path:"all-jobs",
            element:<AllJobs></AllJobs>,
            loader:allJobsLoader
          },
          {
            path:"stats",
            element:<Stats></Stats>,
            loader: statsLoader
          },
          {
            path:"admin",
            element:<Admin></Admin>,
            loader: adminJobsLoader
          },
          {
            path:"profile",
            element:<Profile></Profile>,
            action:profileAction
          },
          {
            path:"edit-job/:id",
            element:<EditJob></EditJob>,
            loader:editJobsLoader,
            action:editJobsAction
          },
          {
            path:'delete-job/:id',
            action: deleteJobsAction
          }
        ]
      },
      
    ]
  },
  
]) 

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
