import mongoose from 'mongoose';
import jobModels from '../models/jobModels.js';
import {StatusCodes} from 'http-status-codes'
import day from 'dayjs'

export const getAllJobs = async  (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }
  if (jobStatus && jobStatus !== 'all') {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await jobModels.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

    const totalJobs = await jobModels.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
  }

export const getSingleJob = async (req,res)=>{
    
    const job = await jobModels.findById(req.params.id)
    
    res.status(StatusCodes.OK).json({job})
  }

export const createJob = async(req,res)=>{
  req.body.createdBy = req.user.userId
    const job = await jobModels.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
  }

export const updateJob = async(req,res)=>{
    
    const job = await jobModels.findByIdAndUpdate(req.params.id,req.body,{new:true})
    
  
    res.status(StatusCodes.OK).json({job})
  }

export const deleteJob = async(req,res)=>{
   const job =await jobModels.findByIdAndDelete(req.params.id,req.body)
    
    
    res.status(StatusCodes.OK).json({msg:"job deleted"})
  }

export const stats = async(req,res)=>{
 let statsAgg = await jobModels.aggregate([
  {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
  {$group: {_id:'$jobStatus', count:{$sum:1}}}
 ])
const count = statsAgg.reduce((acc,curr)=>{
  const {_id:title,count} = curr
  acc[title] = count
  return acc
},{})
const defaultStats = {
  pending: count.pending || 0,
  accepted: count.accepted || 0,
  declined: count.declined || 0,
  interviewed: count.interviewed || 0
}

let monthlyApplications = await jobModels.aggregate([
  {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
  {$group: {_id: {year: {$year: '$createdAt'}, month: {$month: '$createdAt'}},
            count: {$sum: 1}
  }},
  {$sort:{'_id.year': -1, '_id.month': -1}},
  {$limit: 6}
])
monthlyApplications = monthlyApplications.map((item)=>{
const {_id:{year,month}, count} = item

const date = day().month(month -1).year(year).format('MMM YY')
return ({date, count})
}).reverse()
res.status(StatusCodes.OK).json({defaultStats,monthlyApplications})
}