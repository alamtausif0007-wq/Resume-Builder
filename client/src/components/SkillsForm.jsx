import { Plus, Sparkles, X } from 'lucide-react';
import React, { useState } from 'react'

const SkillsForm = ({data,onChange}) => {
    const [newSkill,setNewSkill]=useState("");
    const addSkill=()=>{
        if(newSkill.trim() && !data.includes(newSkill.trim())){
            onChange([...data,newSkill.trim()]);
            setNewSkill("");
        }
    }
    const removeSkill=(indexToRemove)=>{
        onChange(data.filter((_,index)=>index!==indexToRemove))
    }
    const handleKeyPress=(e)=>{
        if(e.key ==="Enter"){
            e.preventDefault();
            addSkill();
        }
}
  return (
    <>
    <div className='space-y-4'>
        <h3 className='flex items-center gap-2  text-lg  font-semibold text-white'>Skills</h3>
        <p className='text-sm text-slate-400 mb-2'>Add your technical and soft skills</p>
    </div>
    <div className='flex gap-2  '>
        <input type="text"
        placeholder='Enter a skill (e.g., Javascript, Project Management)'
        className='flex-1 py-2 px-3 text-sm'
        onChange={(e)=>setNewSkill(e.target.value)}
        value={newSkill}
        onKeyDown={handleKeyPress}
        />
        <button onClick={addSkill} className='flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg disabled:cursor-not-allowed hover:bg-emerald-700 transition-colors shadow-[0_0_15px_rgba(124,58,237,0.3)]' ><Plus className='size-4'/>Add </button>
    </div>
    {data.length>0 ? (
        <div className='flex flex-wrap gap-2 mt-2'>
            {data.map((skill,index)=>(
                <span key={index} className='flex items-center  gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-sm  '>
                    {skill}
                    <button className='mt-1 hover:bg-emerald-500/40 rounded-full p-0.5 transition-colors ' onClick={()=>removeSkill(index)}>
                        <X className='w-3 h-3'/>
                    </button>
                </span>
            ))}
        </div>
    ):(
        <div className='text-center py-6 text-slate-400 '>
            <Sparkles className='w-10 h-10 mx-auto mb-2 text-slate-600 '/>
            <p>No skills added yet.</p>
            <p className='text-sm'>Add your technical and soft skills above</p>
        </div>
    )}
    <div className='bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl mt-4'>
        <p className='text-sm text-emerald-300'><strong>Tip: </strong>Add 8-12 relevant skills. Include both technical(programming languages, tools) and soft skills(leadership,communication)</p>
    </div>
    </>
  )
}

export default SkillsForm
