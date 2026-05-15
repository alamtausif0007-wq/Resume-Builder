const express=require('express')
const router=express.Router()
const aiCtrl=require('../controllers/aiController')
const protect=require('../middlewares/authMiddleware')
const ApiLimiter=require('../middlewares/RateLimiter')
router.post('/enhance-pro-sum',protect,ApiLimiter,aiCtrl.enhanceProfessionalSummary)
router.post('/enhance-job-desc',protect,ApiLimiter,aiCtrl.enhanceJobDescription)
router.post('/upload-resume',protect,aiCtrl.uploadResume)
 module.exports=router