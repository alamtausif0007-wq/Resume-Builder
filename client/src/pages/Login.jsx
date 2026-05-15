import React from 'react'
import { useState } from 'react'
import { User2Icon, LockIcon, Mail, Lock } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { login } from '../app/features/authSlice';
import toast from 'react-hot-toast';
import api from'../configs/api'
const Login = () => {
    const dispatch=useDispatch();
  const query=new URLSearchParams(window.location.search);
  const urlState=query.get('state')
  const [state, setState] = useState(urlState||"login")
const [forgetPassowrd, setforgetPassword] = useState(false);
const [forgetPasswordStep, setForgetPasswordStep] = useState(1);

const handleforgetPassword = async () => {
    setforgetPassword(true);
    setForgetPasswordStep(1);
}
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      passwordOtp:''
  })

  const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const {data}=await api.post(`/api/users/${state}`,formData)
        dispatch(login(data))
        localStorage.setItem('token',data.token)
        toast.success(data.message)
      } catch (error) {
       toast(error?.response?.data?.message || error.message) 
      }

  }

  const handleSendOtp = async (e) => {
      e.preventDefault();
      try {
          const {data} = await api.post('/api/users/send-otp', { email: formData.email });
          toast.success(data.message);
          setForgetPasswordStep(2);
      } catch (error) {
          toast.error(error?.response?.data?.message || error.message);
      }
  }

  const handleResetPassword = async (e) => {
      e.preventDefault();
      try {
          const {data} = await api.post('/api/users/reset-password', {
              email: formData.email,
              otp: formData.passwordOtp,
              newPassword: formData.password
          });
          toast.success(data.message);
          setforgetPassword(false);
          setForgetPasswordStep(1);
          setFormData(prev => ({...prev, password: '', passwordOtp: ''}));
      } catch (error) {
          toast.error(error?.response?.data?.message || error.message);
      }
  }

  const handleChange = (e) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
  }
  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        {!forgetPassowrd && (state === 'login' || state === 'register') ? (
          <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
            <h1 className="text-gray-900 text-3xl mt-10 font-medium">{state === "login" ? "Login" : "Sign up"}</h1>
            
            <p className="text-gray-700 text-sm mt-2">
              {state === 'login' ? 'Please sign in to continue' : 'Please sign up to continue'}
            </p>
            {state !== "login" && (
                <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <User2Icon size={16} color='#6B7280' />
                    <input type="text" name="name" placeholder="Name" className="border-none text-black outline-none ring-0" value={formData.name} onChange={handleChange} required />
                </div>
            )}
            <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <Mail size={16} color='#6B7280' />
                <input type="email" name="email" placeholder="Email id" className="border-none text-black outline-none ring-0" value={formData.email} onChange={handleChange} required />
            </div>
            
            <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <Lock size={16} color='#6B7280' />
                <input type="password" name="password" placeholder="Password" className="border-none text-black outline-none ring-0" value={formData.password} onChange={handleChange} required />
            </div>
            
            <div className="mt-4 text-left text-emerald-500">
                <button onClick={handleforgetPassword} className="text-sm" type="button">Forget password?</button>
            </div>
            <button type="submit" className="btn-neon mt-2 w-full h-11 rounded-full text-lg">
                {state === "login" ? "Login" : "Sign up"}
            </button>
            <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-gray-700 text-sm mt-3 mb-11 cursor-pointer">
              {state === "login" ? "Don't have an account?" : "Already have an account?"} <span className="text-emerald-500 hover:underline">click here</span>
            </p>
          </form>
        ) : forgetPasswordStep === 1 ? (
          <form onSubmit={handleSendOtp} className='sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-6 py-8 bg-white'>
            <h1 className="text-gray-900 text-2xl font-medium mb-4">Reset Password</h1>
            <p className="text-gray-700 text-sm mb-6">Enter your email to receive an OTP</p>
            <div className='bg-white flex items-center w-full border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 mb-6'>
                <Mail size={16} color='#6B7280' />
                <input type="email" name="email" placeholder="Email id" className="border-none text-black outline-none ring-0 w-full pr-4" value={formData.email} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn-neon w-full h-11 rounded-full text-lg mb-4">
              Send OTP
            </button>
            <p onClick={() => setforgetPassword(false)} className="text-gray-700 text-sm cursor-pointer hover:underline">
              Back to Login
            </p>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className='sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-6 py-8 bg-white'>
            <h1 className="text-gray-900 text-2xl font-medium mb-4">New Password</h1>
            <p className="text-gray-700 text-sm mb-6">Enter the OTP sent to your email and your new password</p>
            <div className='bg-white flex items-center w-full border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 mb-4'>
                <User2Icon size={16} color='#6B7280' />
                <input type="text" name="passwordOtp" placeholder="6-digit OTP" className="border-none text-black outline-none ring-0 w-full pr-4" value={formData.passwordOtp} onChange={handleChange} required />
            </div>
            <div className='bg-white flex items-center w-full border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 mb-6'>
                <Lock size={16} color='#6B7280' />
                <input type="password" name="password" placeholder="New Password" className="border-none text-black outline-none ring-0 w-full pr-4" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn-neon w-full h-11 rounded-full text-lg mb-4">
              Reset Password
            </button>
            <p onClick={() => setforgetPassword(false)} className="text-gray-700 text-sm cursor-pointer hover:underline">
              Back to Login
            </p>
          </form>
        )}
      </div>
    </>
  )
}

export default Login