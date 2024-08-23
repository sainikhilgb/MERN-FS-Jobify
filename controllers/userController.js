import usersModel from "../models/usersModel.js";
import jobModel from '../models/jobModels.js'
import { StatusCodes } from "http-status-codes";
import cloudinary from 'cloudinary'
import { promises as fs } from 'fs';

export const getCurrentUser = async(req,res)=>{
    const user = await usersModel.findOne({_id: req.user.userId})
    const noPassword = user.toJSON()
    res.status(StatusCodes.OK).json({user:noPassword})
}

export const getAppStats = async(req,res)=>{
    const jobs = await jobModel.countDocuments()
    const users = await usersModel.countDocuments()
    res.status(StatusCodes.OK).json({jobs,users})
}

export const updateUser = async(req,res)=>{
    const newUser = {...req.body}
    delete newUser.password
    if(req.file){
        const response = await cloudinary.v2.uploader.upload(req.file.path)
        await fs.unlink(req.file.path)
        newUser.avatar = response.secure_url
        newUser.avatarPublicId = response.public_id
    }

    const oldUser = await usersModel.findByIdAndUpdate(req.user.userId,newUser)

    if(req.file && oldUser.public_id){
        await cloudinary.v2.uploader.destroy(oldUser.avatarPublicId)
    }
    
    res.status(StatusCodes.OK).json({msg:'Updated user'})
}