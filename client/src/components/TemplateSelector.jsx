import { Check, Layout } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
const TemplateSelector = ({selectedTemplate,onChange}) => {
    const [isOpen,setIsOpen]=useState(false)
    const templates = [
        {
          id: 'classic',
          name: 'Classic',
          preview: 'A clean, traditional layout that focuses on clarity and readability.'
        },
        {
          id: 'modern',
          name: 'Modern',
          preview: 'A stylish and professional design with a clean and modern look.'
        },
        {
          id: 'minimal-image',
          name: 'Minimal Image',
          preview: 'A simple and elegant layout with a professional profile image.'
        },
        {
          id: 'minimal',
          name: 'Minimal',
          preview: 'A simple and elegant design that focuses on your skills and experience.'
        }
      ];
  return (
   <>
   <div className='relative'>
    <button onClick={()=>setIsOpen(!isOpen)} className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-blue-100 border border-blue-300 rounded-lg hover:bg-blue-200 transition-colors'>
        <Layout size={14} color='#3B82F6'/><span className='max-sm:hidden text-blue-900 '>Template</span>
    </button>
    {isOpen && (
        <div className=' absolute top-full left-0 mt-2 w-72 p-4 bg-white border border-gray-200 rounded-xl shadow-xl space-y-3 z-50'>
            {templates.map((template)=>(
                <div key={template.id} onClick={()=>{onChange(template.id);setIsOpen(false)}} className={`group relative p-3 border rounded-lg cursor-pointer transition-all ${selectedTemplate===template.id?"border-blue-400 bg-blue-100":"border-gray-300 hover:border-gray-400 hover:bg-gray-100"}`} >
                    {selectedTemplate===template.id && (
                        <div className='absolute top-2 right-2'>
                            <div className='size-5 bg-blue-400 rounded-full flex items-center justify center '>
                                <Check className='w-3 h-3 text-white'/>
                            </div>
                        </div>
                    )}
                    <div className='space-y-1'>
                        <h4 className='font=medium text-gray-800'>{template.name}</h4>
                        <div className='mt-2 p-2 bg-bue-50 rounded text-xs text-gray-500 italic'>{template.preview}</div>
                    </div>
                </div>
            ))}
        </div>
    )}
    </div>
    </>
  )
}

export default TemplateSelector
