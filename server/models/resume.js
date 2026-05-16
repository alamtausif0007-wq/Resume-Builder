const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    title: { type: String, default: "Untitled Resume" , required:true},
    template: { type: String, default: "classic" },
    accentColor: { type: String, default: "#22c55e" },
    public: { type: Boolean, default: false },

    // Personal Info Section 1st page
    personalInfo: {
        image: { type: String, default: "" },
        fullName: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        location: { type: String, default: "" },
        profession: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        website: { type: String, default: "" },
    },

    // AI Enhanced Professional Summary 2nd page
    professionalSummary: { type: String, default: "" },

    // Work Experience Array 3rd page
    experience: [
        {
            company: { type: String },
            position: { type: String },
            startDate: { type: String },
            endDate: { type: String },
            description: { type: String },
            isCurrent: { type: Boolean, default: false },
        }
    ],

    // Education Array 4th page
    education: [
        {
            institution: { type: String },
            degree: { type: String },
            field: { type: String },
            graduationDate: { type: String },
            gpa: { type: String },
        }
    ],

    // Projects Array 5th page
    projects: [
        {
            name: { type: String },
            type: { type: String },
            description: { type: String },
            link: { type: String },
            github: { type: String },
        }
    ],

    // Skills Array 6th page
    skills: [{ type: String }],

    // Certifications Array
    certifications: [
        {
            name: { type: String },
            url: { type: String },
        }
    ],

}, { 
    timestamps: true, 
    minimize: false // Ensures empty objects like personalInfo are saved to DB
});

module.exports = mongoose.model("resume", resumeSchema);