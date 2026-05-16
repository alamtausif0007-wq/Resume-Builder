import { BriefcaseBusiness, Github, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({data,onChange}) => {
  const handlechange=(field,value)=>{
    onChange({...data,[field]:value})
  }
  const fields=[
    {key:"fullName" ,label:"Full Name",icon:User ,type:"text", required:true},
    {key:"email" , label:"Email Address",icon:Mail ,type:"email", required:true},
    {key:"phone" , label :"Phone Number", icon:Phone ,type:"tel",required:true},
    {key:"location", label:"Location",icon:MapPin ,type:"text",required:true},
    {key:"profession", label:"Profession",icon:BriefcaseBusiness ,type:"text",required:true},
    {key:"linkedin", label:"LinkedIn Profile" , icon:Linkedin,type:"url"},
    {key:"website",label:"GitHub Profile",icon:Github,type:"url"},
  ]
  return (
    <>
    <div>
        <h3 className='text-lg text-white font-semibold'>Personal Information</h3>
        <p className='text-sm text-slate-400'>get started with personal information</p>
        <div className='flex items-center gap-2'>
            <label >
                {data?.image ? (
                    <img src={typeof data.image==='string'?data.image: URL.createObjectURL(data.image) } alt="user-image" className='w-16 h-16 rounded-full object-cover mt-5 ring ring-white/20 hover:opacity-80' />
                ): <div className='inline-flex items-center gap-2 mt-5 text-slate-400 hover:text-white cursor-pointer'><User className='size-10 p-2.5 border border-white/10 rounded-full'/>Upload User Image</div> }
            <input type="file" accept='image/png , image/jpeg' className='hidden' onChange={(e)=>handlechange('image',e.target.files[0])} />
            </label>

        </div>
{fields.map((field)=>{
  const Icon=field.icon;
  return(
    <div key={field.key} className='space-y-1 mt-5'>
      <label className='flex items-center gap-2 text-sm font-medium text-slate-400'>
        <Icon className='size-4'/>
        {field.label}
        {field.required && <span className='text-red-500'>*</span>}
      </label>
      <input type={field.type} 
      value={data?.[field.key]||""}
      onChange={(e)=>handlechange(field.key,e.target.value)}
      className='mt-1 w-full px-3 py-2 text-sm'
      placeholder={`Enter your ${field.label.toLowerCase()}`}
      required={field.required}
      />
    </div>
  )

})}
    </div>
    </>
  )
}

export default PersonalInfoForm
