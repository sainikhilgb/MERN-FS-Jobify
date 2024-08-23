import {body,param,validationResult} from 'express-validator'
import { BadRequestError,NotFoundError, UnautherizedError } from '../errors/CustomErrors.js'
import { JOB_STATUS,JOB_TYPE } from '../utils/constants.js'
import mongoose from 'mongoose'
import jobModels from '../models/jobModels.js'
import usersModel from '../models/usersModel.js'

const withValidatiors = (validationValues)=>{
    return [validationValues,
        (req,res,next)=>{
            const error = validationResult(req)
            if(!error.isEmpty()){
                const errorMessage = error.array().map((err)=>err.msg)
                console.log(errorMessage)
                if(errorMessage[0].endsWith('not found')){
                    throw new NotFoundError(errorMessage)
                }
                if(errorMessage[0].startsWith('not autherized')){
                    throw new UnautherizedError(errorMessage)
                }
                throw new BadRequestError(errorMessage)
            }
            
            next()
        }
    ]

}

export const validationInput = withValidatiors([
    body('company').notEmpty().withMessage('company field required'),
    body('position').notEmpty().withMessage('position field required'),
    body('jobLocation').notEmpty().withMessage('jobLocation field required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid status'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid Type')
])

export const validatParam = withValidatiors([
    param('id').custom(async (value,{req})=> {
        const isValid = mongoose.Types.ObjectId.isValid(value)
        if(!isValid) throw new Error('Invalid MongoId')

        const job = await jobModels.findById(value)
        if(!job){
            throw new Error(`Job with ${value} not found`)
        }
        const isAdmin = req.user.role === 'admin'
        const isOwner = req.user.userId === job.createdBy.toString()

        if(!isAdmin && !isOwner){
            throw new Error('not autherized to access this route') 
        }
    })
])

export const validateRigisterUser = withValidatiors([
    body('name').notEmpty().withMessage('name field required'),
    body('lastName').notEmpty().withMessage('last name field required'),
    body('email').notEmpty().withMessage('email field required').isEmail().withMessage('invalid email fromat')
    .custom(async(email)=>{
        const user = await usersModel.findOne({email})
        if(user){
            throw new BadRequestError(`User with ${email} already exsist`)
        }
    }),
    body('password').notEmpty().withMessage('password field required').isLength({min:8}).withMessage('Password must has atleast 8 charaters'),
    body('location').notEmpty().withMessage('location field required'),
])

export const validateLoginUser = withValidatiors([
    
    body('email').notEmpty().withMessage('email field required').isEmail().withMessage('invalid email fromat'),
    body('password').notEmpty().withMessage('password field required')
])

export const validateUpdateUser = withValidatiors([
    body('name').notEmpty().withMessage('name field required'),
    body('lastName').notEmpty().withMessage('last name field required'),
    body('email').notEmpty().withMessage('email field required').isEmail().withMessage('invalid email fromat')
    .custom(async(email,{req})=>{
        const user = await usersModel.findOne({email})
        if(user && user._id.toString() !== req.user.userId){
            throw new Error(`User with ${email} already exsist`)
        }
    }),
    body('location').notEmpty().withMessage('location field required'),
])