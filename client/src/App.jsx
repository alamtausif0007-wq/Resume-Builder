import  Home  from './pages/Home'
import  Layout  from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import React, { useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import Preview from './pages/Preview'
import { useDispatch } from 'react-redux'
import { login, setLoading } from './app/features/authSlice'
import {Toaster} from 'react-hot-toast'
import api from './configs/api'
import Payment from './pages/Payment'
import Pricing from './pages/Pricing'
import Templates from './pages/Templates'
const App = () => {
  const dispatch=useDispatch();
  const getUserData=async()=>{
    const token= localStorage.getItem('token');
    
    try {
      if(token){
        const {data}=await api.get('/api/users/data',
        {headers:{
          Authorization:`Bearer ${token}`
        }}
        )
        if(data.user){
          dispatch(login({token,user:data.user}))
        }
        dispatch(setLoading(false))
      }
      else{
        dispatch(setLoading(false))
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.log("Something went wrong",error.message)
    }
  }
  useEffect(()=>{
    getUserData();
  },[])
  return (
    <>
    <Toaster/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='app' element={<Layout/>}>
      <Route index element={<Dashboard/>}/>
      <Route path='builder/:resumeId' element={<ResumeBuilder/>} />
    </Route>
    <Route path='view/:resumeId' element={<Preview/>}/>
    <Route path='/payment' element={<Payment/>}/>
    <Route path='/pricing' element={<Pricing/>}/>
    <Route path='/templates' element={<Templates/>}/>
    </Routes>
    </>
  )
}

export default App