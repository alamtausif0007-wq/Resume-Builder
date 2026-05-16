import React from 'react'
import {Plus,Trash2} from 'lucide-react'
const ProjectForm = ({data,onChange}) => {
    const addProject = () => {
        const newProject = {
          name:"",
          type:"",
          link:"",
          github:"",
          description:"",
          
        };
        onChange([...data, newProject]);
      };
      const removedProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
      };
      const updatedProject=(index,field,value)=>{
        const updated=[...data];
        updated[index]={...updated[index],[field]:value};
        onChange(updated);
      }
  return (
    <>
    <div >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold  text-white">
              Projects
            </h3>
            <p className="text-sm text-slate-400">Add your project details.</p>
          </div>
          <button
            onClick={addProject}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors "
          >
            <Plus className="size-4" />
            Add Projects
          </button>
        </div>
        
          <div className="space-y-4 mt-6">
            {data.map((project, index) => ( /*Either use return because of using {} or use () to not use return*/
                
              <div
                key={index}
                className="p-4 border border-white/10 rounded-xl space-y-3 bg-white/5"
              >
                <div className="flex items-start justify-between ">
                  <h4 className="text-white">Project #{index + 1}</h4>
                  <button
                    onClick={() => removedProject(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="grid gap-3">
                  <input
                    type="text"
                    value={project.name || ""}
                    onChange={(e) =>
                      updatedProject(index, "name", e.target.value)
                    }
                    placeholder="Project Name"
                    className="px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    value={project.type || ""}
                    onChange={(e) =>
                      updatedProject(index, "type", e.target.value)
                    }
                    placeholder="Project Type"
                    className="px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    value={project.link || ""}
                    onChange={(e) =>
                      updatedProject(index, "link", e.target.value)
                    }
                    placeholder="Project Link"
                    className="px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    value={project.github || ""}
                    onChange={(e) =>
                      updatedProject(index, "github", e.target.value)
                    }
                    placeholder="GitHub Link"
                    className="px-3 py-2 text-sm"
                  />
                   <textarea
                   rows={4}
                    type="text"
                    value={project.description || ""}
                    onChange={(e) =>
                      updatedProject(index, "description", e.target.value)
                    }
                    placeholder="Describe your project..."
                    className="px-3 py-2 text-sm w-100"
                  />
               
               
                </div>
              </div>
            )
            )}
          </div>
        
      </div>

    </>
  )
}

export default ProjectForm
