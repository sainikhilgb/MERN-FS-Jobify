import {Router} from 'express'
const router = Router()
import {getAllJobs,getSingleJob,createJob,updateJob,deleteJob,stats} from '../controllers/jobControllers.js'
import { validationInput,validatParam } from '../middleware/validationMiddleware.js'
import { testUserValidation } from '../middleware/authenticateMideleware.js'

router.route('/').get(getAllJobs).post(testUserValidation,validationInput,createJob)
router.route('/stats').get(stats)
router.route('/:id').get(validatParam,getSingleJob).delete(testUserValidation,validatParam,deleteJob).patch(testUserValidation,validationInput,validatParam,updateJob)

export default router