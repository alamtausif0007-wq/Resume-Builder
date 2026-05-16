const resume = require("../models/resume");
const imagekit=require('../configs/imagekit')
const fs=require('fs')
//creating a new resume
//post:/api/resumes
exports.createResume=async(req,res)=>{
    try {
        const userId=req.userId;
        const {title}=req.body
        //create new resume
        const newResume=await resume.create({userId,title})
        if(!newResume){
            console.log("Something went wrong while creating resume")
        }
         return res.status(200).json({message:"Resume Created Successfully",resume:newResume})
    } catch (error) {
        
    }
}
//deleting a resume
//delete:/api/resumes/:resumeId
exports.deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;
        const isDeleted = await resume.findOneAndDelete({ userId: userId, _id: resumeId });
        if (!isDeleted) {
            return res.status(404).json({ message: "Resume not found" });
        }        
        return res.status(200).json({ message: "Resume Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
//get user resume by id
//get:/api/resumes/:resumeId
exports.getResumeById=async(req,res)=>{
    try {
        const userId=req.userId;
        const {resumeId}=req.params
// .lean() returns a plain JS object; .select('-field') excludes it
        const getResume = await resume.findOne({ userId, _id: resumeId })
                                      .select('-__v -createdAt -updatedAt')
                                      .lean();
        if(!getResume){
            res.status(404).json({message:"Resume not found"})
        }
        return res.status(200).json({resume:getResume})
    } catch (error) {
        return res.status(400).json({message:error.message})
        console.log("Something went wrong while fetching resume")
    }
}
//get resume by id public
//get:/api/resumes/public/:resumeId
exports.getPublicResumeById=async(req,res)=>{
    try {
        const {resumeId}=req.params;
        const foundResume=await resume.findOne({public:true,_id:resumeId});
        if(!foundResume){
            return res.status(404).json({message:"Resume not found or is set to Private"})
        }
        return res.status(200).json({resume: foundResume})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}
//controller for updating the resume
//put:/api/resumes/update
exports.updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData } = req.body;
        const image = req.file;

        let resumedatacopy = JSON.parse(resumeData);

        if (image) {
            try {
                const imageBufferedData = fs.createReadStream(image.path);
                const response = await imagekit.upload({
                    file: imageBufferedData,
                    fileName: 'resume.png',
                    folder: 'user-resumes',
                });
                
                let trString = "w-300,h-300,fo-face,z-0.75";
                resumedatacopy.personalInfo.image = response.url + "?tr=" + trString;
            } catch (err) { // Ensure this is named 'err' or 'error'
                console.error("ImageKit Upload Error:", err);
                return res.status(500).json({ message: "Image upload failed" });
            }
        } else if (resumedatacopy.personalInfo && resumedatacopy.personalInfo.image) {
            // Update transformation on existing image if user just toggled the button
            const baseUrl = resumedatacopy.personalInfo.image.split('?')[0];
            let trString = "w-300,h-300,fo-face,z-0.75";
            resumedatacopy.personalInfo.image = baseUrl + "?tr=" + trString;
        }

        const updatedresume = await resume.findOneAndUpdate(
            { _id: resumeId, userId: userId },
            { $set: resumedatacopy },
            { new: true }
        );

        if (!updatedresume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        return res.status(200).json({ message: "Resume Updated Successfully", resume: updatedresume });

    } catch (error) {
        // This catch block now handles everything
        console.error("CRITICAL ERROR IN updateResume:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};