import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice';
const NavbarGlobal = () => {
    const user=useSelector(state=>state.auth.user);
    const dispatch=useDispatch();
    const Navigate=useNavigate()
  const logoutUser=()=>{
        Navigate('/')
        dispatch(logout())
    }
  return (
    <>
    <div className='fixed top-0 left-0 w-full z-50 bg-[#030712]/80 backdrop-blur-md border-b border-white/10 shadow print:hidden'>
        <nav className=' flex justify-between items-center mx-auto px-4 py-3.5 max-w-7xl'>
           <Link to="/" className="flex items-center gap-1.5 group">
                       <span className="text-xl font-bold text-white tracking-tight">
                         Resume
                       </span>
                       <span className="w-2 h-2 bg-purple-400 rounded-full mt-1 animate-pulse"></span>
                     </Link>

            <div className='flex gap-6 items-center'>
                <p className='text-white p-3'>Hi,  {user.name}</p>
                {user && !user.isSubscribed && (
                    <Link to="/payment" className='btn-neon px-6 py-2 rounded-full text-sm'>
                        Subscribe
                    </Link>

                )}
                <button className='btn-neon px-6 py-2 rounded-full text-white cursor-pointer' onClick={logoutUser}>Logout</button>
            </div>
        </nav>
    </div>
    </>
  )
}

export default NavbarGlobal
