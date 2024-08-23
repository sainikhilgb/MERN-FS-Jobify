import 'express-async-errors'
import * as dotenv from 'dotenv';
import express from 'express'
const app = express()
import morgan from 'morgan'
import cloudinary from 'cloudinary';
import mongoose  from 'mongoose';
dotenv.config();
//Routers
import jobRouter from './routers/jobRouters.js'
import authRouter from './routers/authRouter.js'
import userRouter from './routers/userRouter.js'

//public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './public')));
 
import errorHandler from './middleware/errorHandler.js';
import {autenticateUser} from './middleware/authenticateMideleware.js';
import cookieParser from 'cookie-parser';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


app.use(cookieParser())
app.use(express.json())



app.use('/api/jobs',autenticateUser,jobRouter)
app.use('/api/users',autenticateUser,userRouter)
app.use('/api/auth',authRouter)

app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'./public','index.html'))
})
app.use(errorHandler)

const port = process.env.PORT || 5000;
try {
  await mongoose.connect(process.env.DB)
  app.listen(port,()=>{
      console.log(`server started on ${port}`)
      
  })
} catch (err) {
 console.log(err)
 process.exit(1) 
}