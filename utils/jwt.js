import jwt from 'jsonwebtoken'

export const createJWT = (payload)=>{
    const token = jwt.sign(payload,process.env.SECRET,{expiresIn: process.env.EXPIN })
    return token
}

export const verifyJWT = (token)=>{
    const decode = jwt.verify(token,process.env.SECRET)
    return decode

}