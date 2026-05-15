
import { useState,useEffect } from 'react';
import { Link,useParams,useNavigate } from 'react-router-dom';
import { ArrowLeftIcon,Briefcase,FileText,FolderIcon,GraduationCap,Sparkles,User,ChevronLeft,ChevronRight, Folder, Share2Icon, EyeIcon, EyeOffIcon, DownloadIcon, Award } from 'lucide-react';
import { dummyResumeData } from '../assets/assets';
import PersonalInfoForm from '../components/PersonalInfoForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import ColorPicker from '../components/ColorPicker';
import ProfessionalSummary from '../components/ProfessionalSummary';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import ProjectForm from '../components/ProjectForm';
import SkillsForm from '../components/SkillsForm';
import CertificationsForm from '../components/CertificationsForm';
import { useSelector } from 'react-redux';
import {toast} from 'react-hot-toast'
import api from '../configs/api'
const ResumeBuilder = () => {
  const {resumeId}=useParams()
  const {token, user}=useSelector(currState=>currState.auth)
  const navigate = useNavigate();
    const [resumeData, setResumeData] = useState({
    _id:'',
    title:'',
    personalInfo:{},
    professionalSummary:'',
    experience:[],
    education:[],
    projects:[],
    certifications:[],
    skills:[],
    template:"classic",
    accentColor:"#3B82F6",
    public:false
  });

  const loadExistingResume=async()=>{
    try {
      const {data}=await api.get(`/api/resumes/get/${resumeId}`,{headers:{Authorization:`Bearer ${token}`}})
      if(data.resume){
        setResumeData(data.resume)
        document.title=data.resume.title

      }
    } catch (error) {
      console.log(error.message)
      toast.error(error?.response?.data?.message || error.message)
    }
  }
const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const sections=[
    {id:"personal",name:"Personal Info",icon:User},
    {id:"summary",name:"Summary",icon:FileText},
    {id:"experience",name:"Experience ",icon:Briefcase},
    {id:"education",name:"Education ",icon:GraduationCap},
    {id:"projects",name:"Project ",icon:FolderIcon},
    {id:"certifications",name:"Certifications",icon:Award},
    {id:"skills",name:"Skills",icon:Sparkles},

  ]
const activeSection=sections[activeSectionIndex]
const handleInputChange = (sectionKey, newData) => {
  setResumeData(prev => ({
    ...prev,
    [sectionKey]: newData
  }));
};
 useEffect(()=>{
  loadExistingResume();
 },[resumeId])

 const changeResumeVisibility=async()=>{
try {
  const formData=new FormData();
  formData.append("resumeId",resumeId)
  formData.append("resumeData",JSON.stringify({...resumeData,public:!resumeData.public}))
  
const {data}=await api.put(`/api/resumes/update`,formData,{headers:{Authorization:`Bearer ${token}`}})
setResumeData({...resumeData,public:!resumeData.public})
toast.success(data.message)
} catch (error) {
  console.log("Error saving resume:",error)
}}

 const handleShare=()=>{
  if (!user?.isSubscribed) {
      toast.error('Please subscribe to unlock downloading and sharing features!');
      navigate('/payment');
      return;
  }
  const frontendUrl=window.location.href.split('/app/')[0];
  const resumeUrl=frontendUrl+ '/view/' +resumeId;
  navigator.clipboard.writeText(resumeUrl)
    .then(() => toast.success('Link copied to clipboard!'))
    .catch((err) => {
      console.error("Clipboard copy failed:", err);
      toast.error("Failed to copy link. Please try again.");
    });
 }
 const downloadResume=()=>{
  if (!user?.isSubscribed) {
      toast.error('Please subscribe to unlock downloading and sharing features!');
      navigate('/payment');
      return;
  }
  window.print();
 }
const saveResume=async()=>{
  try {
    let updatedResumeData=structuredClone(resumeData)
    if(typeof updatedResumeData.personalInfo?.image==="object"){
      delete updatedResumeData.personalInfo.image
    }
    const formData=new FormData();
    formData.append("resumeId",resumeId);
    formData.append("resumeData",JSON.stringify(updatedResumeData))
    typeof resumeData.personalInfo?.image==='object' && formData.append("image",resumeData.personalInfo.image)

    const {data}=await api.put('/api/resumes/update',formData,{headers:{Authorization:`Bearer ${token}`}})
    setResumeData(data.resume)
    toast.success(data.message);
    return data;
  } catch (error) {
    console.error("Error saving resume",error)
    toast.error(error?.response?.data?.message || "Failed to save resume");
    throw error;
  }
}
 return (
  <>
    <div className='max-w-7xl mx-auto px-4  mt-20 print:hidden'>
      <Link to='/app' className='inline-flex gap-2 items-center text-slate-400 hover:text-white transition-all'>
        <ArrowLeftIcon className='size-4 ' />Back to Dashboard
      </Link>
      <div className='flex justify-between items-center mb-6 border-b border-white/10 py-1'>
        <div className='flex items-center gap-2  '>
          <TemplateSelector selectedTemplate={resumeData.template} onChange={(template)=>setResumeData(prev=>({...prev,template}))}  />
          <ColorPicker selectedColor={resumeData.accentColor} onChange={(color)=>setResumeData(prev=>({...prev,accentColor:color}))}/>
        </div>
      </div>      
    </div>

    <div className='max-w-7xl mx-auto px-4 pb-8 print:p-0 print:m-0 print:w-full print:max-w-none'>
      <div className='grid lg:grid-cols-12 gap-8 print:block print:w-full print:gap-0'>
        {/* LEFT PANEL */}
        <div className='lg:col-span-5 bg-[#0a0a0a] rounded-3xl shadow-[0_0_30px_rgba(124,58,237,0.1)] border border-white/10 overflow-hidden flex flex-col h-fit print:hidden'>
          <div className='h-1.5 bg-white/5 w-full relative'>
            <div 
              className='absolute h-full bg-emerald-600 transition-all duration-500 ease-in-out' 
              style={{ width: `${((activeSectionIndex + 1) / sections.length) * 100}%` }}
            />
          </div>

          <div className='p-8'>
            <div className='flex items-center justify-between mb-10'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl'>
                  <activeSection.icon size={24} />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-white leading-tight'>{activeSection.name}</h2>
                  <p className='text-sm text-slate-400 font-medium'>Step {activeSectionIndex + 1} of {sections.length}</p>
                </div>
              </div>
              
              <div className='flex items-center gap-2'>
                <button 
                  disabled={activeSectionIndex === 0}
                  onClick={() => setActiveSectionIndex(prev => prev - 1)}
                  className='p-2.5 rounded-xl border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white disabled:opacity-40 transition-all shadow-sm'
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  disabled={activeSectionIndex === sections.length - 1}
                  onClick={() => setActiveSectionIndex(prev => prev + 1)}
                  className='p-2.5 rounded-xl border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white disabled:opacity-40 transition-all shadow-sm'
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className='min-h-[450px]'>
              {activeSection.id === "personal" && (
                <PersonalInfoForm 
                  data={resumeData.personalInfo} 
                  onChange={(data) => setResumeData(prev => ({ ...prev, personalInfo: data }))}
                />
              )}
              {activeSection.id==="summary" && (
                <ProfessionalSummary
                 data={resumeData.professionalSummary} 
                 onChange={(data)=>setResumeData(prev=>({...prev,professionalSummary:data}))} 
                 setResumeData={setResumeData}/>
              )}
              {activeSection.id==="experience" && (
                <ExperienceForm 
                data={resumeData.experience}
                onChange={(data)=>setResumeData(prev=>({...prev,experience:data}))}
                />
              )}
              {
                activeSection.id==="education" &&(
                  <EducationForm data={resumeData.education}
                   onChange={(data)=>setResumeData(prev=>({...prev,education:data}))}/>
                )
              }
              {activeSection.id==="projects" && (
                <ProjectForm
                data={resumeData.projects}
                onChange={(data)=>setResumeData(prev=>({...prev,projects:data}))}
                />
              )}
              {activeSection.id==="certifications" && (
                <CertificationsForm
                data={resumeData.certifications}
                onChange={(data)=>setResumeData(prev=>({...prev,certifications:data}))}
                />
              )}
              {activeSection.id==="skills" && (
                <SkillsForm
                data={resumeData.skills}
                onChange={(data)=>setResumeData(prev=>({...prev,skills:data}))}/>
              )}
            </div>
            <button onClick={saveResume} className='w-full p-3 mt-3 bg-emerald-600 border border-emerald-500 rounded-xl hover:bg-emerald-700 text-white font-medium shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-colors'>Save Changes</button>
          </div> {/* This closes p-8 */}
        </div> {/* This closes lg:col-span-5 */}

        {/* RIGHT PANEL */}
       <div className='lg:col-span-7 max-lg:mt-6 print:w-full print:m-0'>
        <div className='relative w-full print:hidden'>
          <div className='flex justify-end gap-2 mb-2'>
            {resumeData.public && (
              <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg  ring-blue-300 hover:ring transition-colors  '><Share2Icon className='size-4'/>Share</button>
            )}
            <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-purple-100 to-purple-200  text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors'>
              {resumeData.public ? <EyeIcon className='size-4'/>:<EyeOffIcon className='size-4'/>}
            {resumeData.public?"Public":"Private"}
            </button>
            <button onClick={downloadResume} className='flex items-center py-2 px-6 gap-2 text-xs bg-linear-to-br from-green-100 to-green-200  text-green-600 ring-green-300 rounded-lg hover:ring transition-colors'> <DownloadIcon className='size-4'/>Download</button>
          </div>


        </div>
        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accentColor}/>
       </div>

      </div> {/* This closes grid */}
    </div> {/* This closes max-w-7xl pb-8 */}
  </>
);
};
export default ResumeBuilder