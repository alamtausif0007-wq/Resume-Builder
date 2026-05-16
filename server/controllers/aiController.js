const resume=require('../models/resume')
const ai=require('../configs/ai')

//controller for enhancing a resume's professional summary
//POST:/api/ai/enhance-pro-sum
exports.enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;
    console.log(userContent)
    if (!userContent) {
      return res.status(404).json({ message: "Missing required files" });
    }
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 statements, highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. Also, return text only—no options or anything else.",
        },
        {
          role: "user",
          content:  userContent ,
        },
      ],
    });
    const enhancedContent = response?.choices[0]?.message?.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    console.error("Error while enhancing professional summary with AI:", error.message);
    return res.status(400).json({ message: error.message });
  }
};

//controller for enhancing a resume's job description
//POST:/api/ai/enhance-job-desc
exports.enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(404).json({ message: "Missing required files" });
    }
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only 1-2 sentences, highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. Also, return text only—no options or anything else.",
        },
        {
          role: "user",
          content:  userContent ,
        },
      ],
    });
    const enhancedContent = response?.choices[0]?.message?.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    console.error("Error while enhancing job description with AI:", error.message);
    return res.status(400).json({ message: error.message });
  }
};
//controller for uploading a resume to the database
//POST:/api/ai/upload-resume
exports.uploadResume = async (req, res) => {

    try {
      const { resumeText,title } = req.body;
      const userId=req.userId
      
      if(!resumeText ) {
        return res.status(404).json({ message: "Missing required fields" });
      }
    const systemPrompt="You are an expert AI agent to extract data from resume."
    const userPrompt=`extract data from this resume ${resumeText} .provide data in the following JSON format with no additional text before or 
    after:{
        professionalSummary: { type: String, default: "" },
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
    education: [
        {
            institution: { type: String },
            degree: { type: String },
            field: { type: String },
            graduationDate: { type: String },
            gpa: { type: String },
        }
    ],
    projects: [
        {
            name: { type: String },
            type: { type: String },
            description: { type: String },
        }
    ],
    skills: [{ type: String }],
    }`
      const response = await ai.chat.completions.create({
        model: process.env.OPENAI_MODEL,
        messages: [
          {
            role: "system",
            content: systemPrompt},
          {
            role: "user",
            content: userPrompt,
          },
        ],
        response_format:{type:'json_object'}
      });
      const extractedData = response?.choices[0]?.message?.content;
      const parsedData=JSON.parse(extractedData)
      const newResume=await resume.create({...parsedData,userId,title})
      return res.json({resumeId:newResume._id})
    } catch (error) {
      console.error("Error while uploading resume with AI:", error.message);
      return res.status(400).json({ message: error.message });
    }
  };