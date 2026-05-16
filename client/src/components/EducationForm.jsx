import React from 'react'
import {GraduationCap,Trash2,Plus}from 'lucide-react'
const EducationForm = ({data,onChange}) => {
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree:"",
      field:"",
      graduationDate:"",
      gpa:""
    };
    onChange([...data, newEducation]);
  };
  const removedEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };
  const updatedEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <>
 <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold  text-white">
              Education
            </h3>
            <p className="text-sm text-slate-400">Add your education details.</p>
          </div>
          <button
            onClick={addEducation}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors "
          >
            <Plus className="size-4" />
            Add Education
          </button>
        </div>
        {data.length === 0 ? (
          <div className="text-center py-8 text-slate-400 ">
            <GraduationCap className="w-12 h-12  mx-auto  mb-3 text-slate-600" />
            <p>No education added yet.</p>
            <p className="text-sm">Click "Add Education" to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((education, index) => ( /*Either use return because of using {} or use () to not use return*/
                
              <div
                key={index}
                className="p-4 border border-white/10 rounded-xl space-y-3 bg-white/5"
              >
                <div className="flex items-start justify-between ">
                  <h4 className="text-white">Education #{index + 1}</h4>
                  <button
                    onClick={() => removedEducation(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={education.institution || ""}
                    onChange={(e) =>
                      updatedEducation(index, "institution", e.target.value)
                    }
                    placeholder="Institute Name"
                    className="px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    value={education.degree || ""}
                    onChange={(e) =>
                      updatedEducation(index, "degree", e.target.value)
                    }
                    placeholder="Degree (e.g. Bachelor's, Master's)"
                    className="px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    value={education.field || ""}
                    onChange={(e) =>
                      updatedEducation(index, "field", e.target.value)
                    }
                    className="px-3 py-2 text-sm"
                    placeholder='Field of Study (e.g. Computer Science)'
                  />
                  <input
                    type="month"
                    value={education.graduationDate|| ""}
                    onChange={(e) =>
                      updatedEducation(index, "graduationDate", e.target.value)
                    }
                    className="px-3 py-2 text-sm"
                  />
                </div>
                
                <input
                    type="text"
                    value={education.gpa|| ""}
                    onChange={(e) =>
                      updatedEducation(index, "gpa", e.target.value)
                    }
                    className="px-3 py-2 text-sm"
                    placeholder='GPA / Percentage (Optional)'
                  />
                
               
              </div>
            )
            )}
          </div>
        )}
      </div>

    </>
  )
}

export default EducationForm
