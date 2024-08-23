import { Router } from "express";
const router = Router()
import { register,login,logout } from "../controllers/authController.js";
import { validateRigisterUser,validateLoginUser } from "../middleware/validationMiddleware.js";

router.route('/register').post(validateRigisterUser,register)
router.route('/login').post(validateLoginUser,login)
router.route('/logout').get(logout)

export default router