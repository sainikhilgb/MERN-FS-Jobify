import usersModel from "../models/usersModel.js";
import { StatusCodes } from "http-status-codes";
import  {hashPassword,comparePassword}  from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/CustomErrors.js";
import { createJWT } from "../utils/jwt.js";

export const register = async(req,res)=>{
    const isFirst = await usersModel.countDocuments() === 0
    req.body.role= isFirst?'admin':'user'

    const hashedPassword = await hashPassword(req.body.password) 
   req.body.password =hashedPassword
     await usersModel.create(req.body)
    res.status(StatusCodes.CREATED).json({msg:'User created'})
}

export const login = async(req,res)=>{
    const user = await usersModel.findOne({email: req.body.email}) 
    if(!user){
        throw new UnauthenticatedError(`User with ${req.body.email} doesnot exsist`)
    }
    const isPasswordMatched = await comparePassword(req.body.password, user.password)
    if(!isPasswordMatched){
        throw new UnauthenticatedError(`Incorrect Password`)
    }

    const token = createJWT({userId: user._id, role:user.role})
    
    const oneDay = 1000 * 60 * 60 * 24
    
    res.cookie('token',token,{
        httpOnly: true,
        expires: new Date(Date.now()+ oneDay),
        secure: process.env.NODE_ENV === 'production'
    })
    res.status(StatusCodes.OK).json({msg:"User logged in"})
}

export const logout = (req, res)=>{
    res.cookie('token', 'logout',{
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({msg:'User logout'})
}