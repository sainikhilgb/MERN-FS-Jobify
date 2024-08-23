import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Wrapper from "../assets/wrappers/Dashboard"
import {SmallSidebar,BigSidebar,NavBar} from "../components"
import { createContext, useContext, useState } from "react"
import { checkDefaultTheme } from "../App"
import { customFetch } from '../utils/customFetch';
import { toast } from 'react-toastify';

export const loader = async()=>{
  try {
    const {data} = await customFetch('/users/current-user')
    return data
  } catch (error) {
    return redirect('/')    
  }
}

const DashboardContext = createContext()

const DashboardLayout = () => {


  const {user} = useLoaderData()
 const navigate = useNavigate()
  const [showSidebar,setShowSidebar]= useState(false)
  const [isDarkTheme,setIsDarkTheme]= useState(checkDefaultTheme())

  const toggleDarkTheme = ()=>{
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    document.body.classList.toggle('dark-theme', newDarkTheme)
    localStorage.setItem('darkTheme',newDarkTheme)
  }

  const toggleSidebar = ()=>{
    setShowSidebar  (!showSidebar)
  }

  const logoutUser = async()=>{
    navigate('/')
    await customFetch('/auth/logout')
    toast.success('Logout success...')
  }
  

  return (
      <DashboardContext.Provider value={{user,showSidebar,isDarkTheme,toggleDarkTheme,toggleSidebar,logoutUser}}>    

    <Wrapper>
      <main className="dashboard">
        <SmallSidebar></SmallSidebar>
        <BigSidebar></BigSidebar>
        <div>
          <NavBar></NavBar>
          <div className="dashboard-page">
          <Outlet context={{user}}></Outlet>
          </div>
        </div>
      </main>
      
    </Wrapper>
      </DashboardContext.Provider>
  )
}

export const useDashboardContext = ()=>useContext(DashboardContext)
export default DashboardLayout