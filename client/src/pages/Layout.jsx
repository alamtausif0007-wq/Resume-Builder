import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarGlobal from '../components/NavbarGlobal'
import {useSelector} from 'react-redux'
import { Loader2} from 'lucide-react'
import Login from '../pages/Login'
const Layout = () => {
  const {user,loading}=useSelector(state=>state.auth)
  if(loading){
  return(
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <Loader2 className="w-12 h-12 animate-spin text-gray-600" />
    </div>
  )
  }
  return (
    <div>
       {user?(
         <div className='min-h-screen bg-[#030712] print:bg-transparent relative'>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none print:hidden" />
         <NavbarGlobal/>
           <Outlet/>
       </div>
       ):(
        <Login/>
       )}

    </div>
  )
}

export default Layout