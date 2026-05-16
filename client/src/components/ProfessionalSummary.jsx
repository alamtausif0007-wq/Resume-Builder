import { Loader2, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {toast} from 'react-hot-toast'
import api from '../configs/api'
const ProfessionalSummary = ({data,onChange,setResumeData}) => {
    const {token}=useSelector(currState=>currState.auth)
    const [isGenerating,setIsGenerating]=useState(false)
    const generateSummary=async()=>{
        try {
            setIsGenerating(true)
            const prompt=`enhance my professional summary "${data}"`
            const response=await api.post('/api/ai/enhance-pro-sum',{userContent:prompt},{headers:{Authorization:`Bearer ${token}`}})
            setResumeData(prev => ({
                ...prev, 
                professionalSummary: response.data.enhancedContent
            }));    
         } 
     
            catch (error) {
                console.error("Full error object:", error); // See the full error
            toast.error(error?.response?.data?.message || error.message)
            }
            
        finally{
            setIsGenerating(false)
        }
    }
  return (
   <>
   <div className='space-y-4'>
    <div className='flex items-center justify-between'>
        <div>
            <h3 className='text-lg font-semibold text-white'>Professional Summary</h3>
            <p className='text-sm text-slate-400'>Add Summary for your resume here</p>
        </div>
        <button disabled={isGenerating} onClick={generateSummary} className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 rounded-lg hover:bg-emerald-500/20 transition-colors disabled:opacity-50'>
           {isGenerating?(<Loader2 className='size-4 animate-spin'/>):(<Sparkles className='size-4'/>)}
            {isGenerating?("Enhancing..."):("AI Enhance")}
        </button>
    </div>
    <div className='mt-6'>
    <textarea rows={7} value={data||""} onChange={(e)=>onChange(e.target.value)} className='w-full p-4 text-sm resize-none' placeholder='Write a compelling professional summary that highlights your key strengths  and career objectives...'></textarea>
    <p className='text-xs text-slate-400 max-w-4/5 mx-auto text-center mt-2'>Tip: keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.</p>
    </div>
   </div>
   </>
  )
}

export default ProfessionalSummary
