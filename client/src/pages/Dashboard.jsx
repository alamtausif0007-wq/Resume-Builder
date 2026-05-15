import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { dummyResumeData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import { toast } from 'react-hot-toast';
import pdfToText from 'react-pdftotext';
const Dashboard = () => {
  const {user,token}=useSelector(state=>state.auth)
  const colors = ['#6366f1', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6']; 
   const [AllResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title,setTitle]=useState('');
  const [resume,setResume]=useState('');
  const [editResumeId,setEditResumeId]=useState('');
  const[isLoading,setIsLoading]=useState(false);
  const navigate=useNavigate();
  const loadAllResumes=async()=>{
    try {
      const {data}=await api.get('/api/users/resumes',{headers:{Authorization:`Bearer ${token}`}})
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }
  const createResume=async(e)=>{
    if (!token) {
      console.error("No token found!");
      toast.error("You must be logged in to create a resume.");
      return;
    }
    try {
      e.preventDefault();
      const {data}=await api.post('/api/resumes/create',{title},{headers:{Authorization:`Bearer ${token}`}})
      setAllResumes([...AllResumes,data.resume]);
      setTitle('');
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
  
      toast.error(error?.response?.data?.message || error.message)
    }
  }
  const uploadResume=async(e)=>{
    e.preventDefault();
    setIsLoading(true);
    // Fetch fresh token directly from storage
  const currentToken = localStorage.getItem('token');
    try {
      const resumeText=await pdfToText(resume);
      const {data}=await api.post('/api/ai/upload-resume',{title,resumeText},{headers:{Authorization:`Bearer ${token}`}})
      setTitle('');
      setResume(null)
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      console.log("someting went wrong",error)
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false);
  }
  const editTitle=async(event)=>{
   try {
    event.preventDefault();
    const {data}=await api.put(`/api/resumes/update`,{resumeId:editResumeId, resumeData:JSON.stringify({title})},{headers:{Authorization:`Bearer ${token}`}})
    setAllResumes(AllResumes.map(resume=>resume._id===editResumeId?{...resume,title}:resume))
    setTitle('');
    setEditResumeId('');
    toast.success(data.message)
   } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
   }
  }
  const deleteResume=async(resumeId)=>{
 try {
     const confirm=window.confirm('Are you sure you want to delete this resume?');
     if(confirm){
       const{data}=await api.delete(`/api/resumes/delete/${resumeId}`,{headers:{Authorization:`Bearer ${token}`}})
       setAllResumes(AllResumes.filter(resume=>resume._id!==resumeId));
       toast.success(data.message)
     }
 } catch (error) {
  toast.error(error?.response?.data?.message || error.message)
 }
  }
  useEffect(()=>{
    loadAllResumes()
  },[])
  return (
   <>
   <div className='mt-20 ' >
   <div className='max-w-7xl mx-auto px-4 py-8  gap-10'>

  <p className='text-2xl font-medium mb-6 bg-linear-to-r from-emerald-400 to-emerald-600 
  bg-clip-text text-transparent sm:hidden'>Welcome, {user?.name}</p>

  <div className='flex gap-4 ' >
    <button onClick={(e)=>{
      e.stopPropagation()
      setShowCreateResume(true);

    }}  className='w-full bg-white/5 sm:max-w-36 h-48 flex flex-col items-center 
    justify-center rounded-lg gap-2 text-slate-300 border border-dashed 
    border-white/20 group hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all 
    duration-300 cursor-pointer px-4 backdrop-blur-sm'>
      <PlusIcon className='size-11 transition-all duration-300 p-2.5 
      bg-linear-to-br from-emerald-400 to-emerald-600 text-white rounded-full' />
      <p className='whitespace-nowrap text-sm group-hover:text-emerald-500 transition-all 
      duration-300 '>Create Resume</p>
    </button>

    <button onClick={()=>setShowUploadResume(true)} className='w-full bg-white/5 sm:max-w-36 h-48 flex flex-col items-center 
    justify-center rounded-lg gap-2 text-slate-300 border border-dashed 
    border-white/20 group hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all 
    duration-300 cursor-pointer px-4 backdrop-blur-sm'>
      <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 
      bg-linear-to-br from-emerald-400 to-emerald-600 text-white rounded-full' />
      <p className='text-sm group-hover:text-emerald-400 transition-all 
      duration-300'>Upload Existing</p>
    </button>
  </div>
<hr  className='border-white/10 my-6 sm:w-76'/>
<div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
{AllResumes.map((resume,index)=>{
  const baseColor=colors[index%colors.length];
  return (
    <button key={index} onClick={()=>{navigate(`/app/builder/${resume._id}`)}} className='relative w-full sm:max-w-36 h-48 flex 
    flex-col items-center justify-center rounded-lg gap-2 border group 
    hover:shadow-lg transition-all duration-300 cursor-pointer' style=
    {{background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)
    `, borderColor: baseColor + '40'}}>
  
      <FilePenLineIcon  className="size-7 group-hover:scale-105 
      transition-all " style={{ color: baseColor }}/>
      <p className='text-sm group-hover:scale-105 transition-all px-2 
      text-center' style={{ color: baseColor }}>{resume.title}</p>
      <p className='absolute bottom-1 text-[11px] text-slate-400 
      group-hover:text-slate-500 transition-all duration-300 px-2 
      text-center' style={{ color: baseColor + '90' }}>
        Updated on {new Date(resume.updatedAt).toLocaleDateString()}
      </p>
  <div onClick={e=>e.stopPropagation()} className='absolute top-1 right-1 text-slate-400 group-hover:flex items-center hidden'>
    <TrashIcon onClick={()=>{deleteResume(resume._id)}} className='size-7 p-1.5 hover:bg-white/50 rounded  text-slate-700 transition-colors' />
    <PencilIcon onClick={()=>{setEditResumeId(resume._id);setTitle(resume.title)}} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'/>
  </div>
    </button>
  )
})}
</div>

{/*Create Resume Modal Page */}
{showCreateResume &&(
  <form onSubmit={createResume} onClick={()=>{setShowCreateResume(false)}} className='fixed inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm z-10'>
<div onClick={(e)=>{e.stopPropagation()}} className='relative bg-[#0a0a0a] border border-white/10 shadow-2xl rounded-2xl w-full max-w-sm p-8'>
 <h2 className='text-xl font-bold mb-4 text-white'>Create a Resume</h2>
 <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" placeholder='Enter Resume Title' className='w-full px-4 py-3 mb-6 focus:ring-emerald-500 border-white/10 bg-white/5 text-white placeholder-slate-500 rounded-xl outline-none' required/>
  <button className='btn-neon w-full py-3 rounded-xl text-lg'>Create Resume</button>
  <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer transition-colors'onClick={()=>{setShowCreateResume(false);setTitle('');}} />
</div>

  </form>
)}
{/*Upload Existing Resume*/}
{showUploadResume && (
  <form onSubmit={uploadResume} onClick={() => { setShowUploadResume(false) }} className='fixed inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm z-10'>
    <div onClick={(e) => { e.stopPropagation() }} className='relative bg-[#0a0a0a] border border-white/10 shadow-2xl rounded-2xl w-full max-w-sm p-8'>
      <h2 className='text-xl font-bold mb-4 text-white'>Upload Resume</h2>
      
      {/* Title Input */}
      <input onChange={(e) => { setTitle(e.target.value) }} value={title} type="text" placeholder='Enter Resume Title' className='w-full px-4 py-3 mb-4 focus:ring-emerald-500 border border-white/10 bg-white/5 text-white placeholder-slate-500 rounded-xl outline-none' required />

      <div className='mb-6'>
        {/* Label and Upload Box */}
        <label htmlFor="resume-input" className='block text-sm font-medium text-slate-300 mb-2'>
        <span className='block text-sm font-medium text-slate-300 mb-2'>
      Select Resume File
    </span>
        
        {/* Upload Box */}
        <div className='w-full h-32 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-emerald-500 hover:bg-emerald-500/10 transition-all text-slate-400 relative'>
          {resume ? (
            <p className='text-emerald-400 font-medium'>{resume.name}</p>
          ) : (
            <>
              <UploadCloudIcon className='size-10 text-slate-500' />
              <p className='text-sm'>Click to upload PDF</p>
            </>
          )}
          {/* The actual hidden file input */}
          <input 
            type="file" 
            id="resume-input" 
            accept=".pdf" 
            hidden 
            onChange={(e) => setResume(e.target.files[0])} 
          />
        </div>
        </label>
      </div>

      <button disabled={isLoading} className='btn-neon w-full py-3 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed'>
        {isLoading && <LoaderCircleIcon className='animate-spin size-4 text-white'/>}
        {isLoading ? 'Uploading...' : 'Upload Resume'}
      </button>

      <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer transition-colors' onClick={() => { setShowUploadResume(false); setTitle(''); setResume(null); }} />
    </div>
  </form>
)}
{/*Edit ResumeId*/}
{editResumeId &&(
  <form onSubmit={editTitle} onClick={()=>{setEditResumeId('')}} className='fixed inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm z-10'>
<div onClick={(e)=>{e.stopPropagation()}} className='relative bg-[#0a0a0a] border border-white/10 shadow-2xl rounded-2xl w-full max-w-sm p-8'>
 <h2 className='text-xl font-bold mb-4 text-white'>Edit Resume Title</h2>
 <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" placeholder='Enter Resume Title' className='w-full px-4 py-3 mb-6 focus:ring-emerald-500 border border-white/10 bg-white/5 text-white placeholder-slate-500 rounded-xl outline-none' required/>
  <button  className='btn-neon w-full py-3 rounded-xl'>Update Resume</button>
  <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer transition-colors'onClick={()=>{setEditResumeId('');setTitle('');}} />
</div>

  </form>
)}
</div>
   </div>
   </>
  )
}

export default Dashboard