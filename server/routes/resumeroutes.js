const express=require('express')
const router=express.Router()
const resumeController=require('../controllers/resumeController')
const protect=require('../middlewares/authMiddleware')
const upload=require('../middlewares/upload')

router.post('/create',protect,resumeController.createResume)
router.put('/update', protect, upload.single('image'), resumeController.updateResume);
router.delete('/delete/:resumeId',protect,resumeController.deleteResume)
router.get('/get/:resumeId',protect,resumeController.getResumeById)
router.get('/public/:resumeId',resumeController.getPublicResumeById)
 
module.exports=router