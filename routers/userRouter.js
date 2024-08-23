import { Router } from "express";
const router = Router()
import { getCurrentUser,getAppStats,updateUser } from "../controllers/userController.js";
import { validateUpdateUser } from "../middleware/validationMiddleware.js";
import {autherizeAccess,testUserValidation} from '../middleware/authenticateMideleware.js'
import upload from '../middleware/multerMiddelware.js'

router.route('/current-user').get(getCurrentUser)
router.route('/app-stats').get(autherizeAccess('admin'),getAppStats)
router.route('/update-user').patch(testUserValidation,upload.single('avatar'),validateUpdateUser,updateUser)


export default router