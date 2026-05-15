import { Briefcase, Plus, Sparkles, Trash2, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {toast} from 'react-hot-toast'
import api from '../configs/api'
const ExperienceForm = ({ data, onChange }) => {
  const {token}=useSelector(state=>state.auth)
  const [GeneratingIndex,setGeneratingIndex]=useState(-1)
  const addExperience = () => {
   
    const newExperience = {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      isCurrent: false,
    };
    onChange([...data, newExperience]);
  };
  const removedExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };
  const updatedExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  const generatingDescription=async(index)=>{
    setGeneratingIndex(index)
    const experience=data[index]
    const prompt = experience.description 
      ? `Enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}`
      : `Write a job description for the position of ${experience.position} at ${experience.company}`;

    try {
      
      const {data}=await api.post('/api/ai/enhance-job-desc',{userContent:prompt},{headers:{Authorization:`Bearer ${token}`}})
      updatedExperience(index,"description",data.enhancedContent)
    } catch (error) {
      console.error("AI Enhance Error:", error);
      toast.error(error?.response?.data?.message || error.message)
    }
    finally{
      setGeneratingIndex(-1)
    }
  }
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold  text-white">
              Professional Experience
            </h3>
            <p className="text-sm text-slate-400">Add your job experience.</p>
          </div>
          <button
            onClick={addExperience}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors "
          >
            <Plus className="size-4" />
            Add Experience
          </button>
        </div>
        {data.length === 0 ? (
          <div className="text-center py-8 text-slate-400 ">
            <Briefcase className="w-12 h-12  mx-auto  mb-3 text-slate-600" />
            <p>No work experience added yet.</p>
            <p className="text-sm">Click "Add Experience" to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((experience, index) => ( /*Either use return becaus of using {} or use () to not use return*/
                
              <div
                key={index}
                className="p-4 border border-white/10 rounded-xl space-y-3 bg-white/5"
              >
                <div className="flex items-start justify-between ">
                  <h4 className="text-white">Experience #{index + 1}</h4>
                  <button
                    onClick={() => removedExperience(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={experience.company || ""}
                    onChange={(e) =>
                      updatedExperience(index, "company", e.target.value)
                    }
                    placeholder="Company Name"
                    className="px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    value={experience.position || ""}
                    onChange={(e) =>
                      updatedExperience(index, "position", e.target.value)
                    }
                    placeholder="Job Title"
                    className="px-3 py-2 text-sm"
                  />
                  <input
                    type="month"
                    value={experience.startDate || ""}
                    onChange={(e) =>
                      updatedExperience(index, "startDate", e.target.value)
                    }
                    className="px-3 py-2 text-sm"
                  />
                  <input
                    type="month"
                    value={experience.endDate || ""}
                    onChange={(e) =>
                      updatedExperience(index, "endDate", e.target.value)
                    }
                    disabled={experience.isCurrent}
                    className="px-3 py-2 text-sm disabled:opacity-50"
                  />
                </div>
                <label>
                  <input
                    type="checkbox"
                    checked={experience.isCurrent || false}
                    onChange={(e) =>
                      updatedExperience(
                        index,
                        "isCurrent",
                        e.target.checked ? true : false
                      )
                    }
                    className="rounded border-white/10 text-emerald-600 focus:ring-emerald-500 bg-white/5"
                  />
                  <span className="text-sm text-slate-400 ml-2">
                    Currently working here
                  </span>
                </label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-400 ">
                      Job Description
                    </label>
                    <button 
                     type="button"
                     disabled={GeneratingIndex===index || !experience.position || !experience.company}
                     onClick={(e)=>{ e.preventDefault(); generatingDescription(index); }} 
                     className="flex items-center gap-1 px-2 py-1 text-xs bg-emerald-500/10 text-emerald-400 rounded hover:bg-emerald-500/20 transition-colors disabled:opacity-50">
                      {GeneratingIndex===index ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                      {GeneratingIndex===index ? "Enhancing..." : "Enhance with AI"}
                    </button>
                  </div>
                  <textarea
                    className="w-full text-sm px-3 py-2 resize-none"
                    placeholder="Describe your key responsibilities and achievements..."
                    value={experience.description || ""}
                    onChange={(e)=>updatedExperience(index,"description",e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ExperienceForm;
