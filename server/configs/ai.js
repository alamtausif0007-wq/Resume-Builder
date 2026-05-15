const openai=require('openai')
const ai=new openai({
    apiKey:process.env.OPENAI_API_KEY,
    baseURL:process.env.OPENAI_BASE_URL
})
module.exports=ai