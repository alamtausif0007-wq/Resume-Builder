import React from 'react'
import { Plus, Trash2 } from 'lucide-react'

const CertificationsForm = ({ data = [], onChange }) => {
    const addCertification = () => {
        const newCertification = {
            name: "",
            url: ""
        };
        onChange([...data, newCertification]);
    };

    const removeCertification = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateCertification = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                        Certifications & Achievements
                    </h3>
                    <p className="text-sm text-slate-400">Add your certifications or awards.</p>
                </div>
                <button
                    onClick={addCertification}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors"
                >
                    <Plus className="size-4" />
                    Add Certification
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                    <p>No certifications added yet.</p>
                    <p className="text-sm">Click "Add Certification" to highlight your achievements.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((cert, index) => (
                        <div
                            key={index}
                            className="p-4 border border-white/10 rounded-xl space-y-3 bg-white/5"
                        >
                            <div className="flex items-start justify-between">
                                <h4 className="text-white">Certification #{index + 1}</h4>
                                <button
                                    onClick={() => removeCertification(index)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>
                            <div className="grid gap-3">
                                <input
                                    type="text"
                                    value={cert.name || ""}
                                    onChange={(e) =>
                                        updateCertification(index, "name", e.target.value)
                                    }
                                    placeholder="Certification / Achievement Name"
                                    className="px-3 py-2 text-sm w-full"
                                />
                                <input
                                    type="text"
                                    value={cert.url || ""}
                                    onChange={(e) =>
                                        updateCertification(index, "url", e.target.value)
                                    }
                                    placeholder="URL (Optional)"
                                    className="px-3 py-2 text-sm w-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CertificationsForm;
