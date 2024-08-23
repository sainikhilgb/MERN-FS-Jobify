import { UnauthenticatedError, UnautherizedError,BadRequestError } from "../errors/CustomErrors.js"
import { verifyJWT } from "../utils/jwt.js"

export const autenticateUser = (req,res,next)=>{

const {token} = req.cookies
if(!token) throw new UnauthenticatedError('Authentication failed')

    
    try {
       const {userId,role} = verifyJWT(token)
       const testUser = userId === '66c187d2bdea1f5f736451bf'
       req.user = {userId,role,testUser}
        next()
   } catch (error) {
    throw new UnauthenticatedError('Authentication failed')
   } 
}

export const autherizeAccess = (...roles)=>{
   return (req,res,next)=>{

      if(!roles.includes(req.user.role)){
         throw new UnautherizedError('User not autherized to access this route')
      }
      console.log(roles)
      next()

   }
}

export const testUserValidation = (req,res,next)=>{
   if(req.user.testUser){
      throw new BadRequestError('Demo user Read only access')
   }
}