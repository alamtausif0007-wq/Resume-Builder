import React from 'react'
import { useSelector } from 'react-redux';
import ClassicTemplate from './templates/ClassicTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
const ResumePreview = ({data,template,accentColor, classes=""}) => {
    const user = useSelector(state => state.auth.user);

    const renderTemplate=()=>{
        switch (template) {
            case "modern":
                return <ModernTemplate data={data} accentColor={accentColor}/>
            case "minimal":
                return <MinimalTemplate data={data} accentColor={accentColor}/>
                case "minimal-image":
                    return <MinimalImageTemplate data={data} accentColor={accentColor}/>

            default:
            return <ClassicTemplate data={data} accentColor={accentColor}/>    
            
        }
    }
  return (
    <div className='w-full bg-gray-100 h-full'>
        <div id="resume-preview" className={"relative border border-gray-200 print:shadow-none print:border-none "+classes} >
            {renderTemplate()}
            
            {/* Watermark Overlay */}
            {user && !user.isSubscribed && (
                <div 
                    className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='rgba(156, 163, 175, 0.15)' font-family='Arial, sans-serif' text-anchor='middle' alignment-baseline='middle' transform='rotate(-45 150 150)'%3EAI Resume Builder%3C/text%3E%3Ctext x='50%25' y='60%25' font-size='14' fill='rgba(28, 31, 35, 0.15)' font-family='Arial, sans-serif' text-anchor='middle' alignment-baseline='middle' transform='rotate(-45 150 150)'%3ESubscribe to Remove%3C/text%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '300px 300px'
                    }}
                >
                </div>
            )}
        </div>
        <style>
            {`
            @page {
                size: letter;
                margin: 0;
            }
            `}
        </style>
    </div>
  )
}

export default ResumePreview
