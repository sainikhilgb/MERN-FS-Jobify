import mongoose from "mongoose";

const userModel = mongoose.Schema({

    name: String,
    email: String,
    password: String,
    lastname: {
        type: String,
        default: "Last Name"
    },
    location: {
        type: String,
        default: "My city"
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    avatar: String,
    avatarPublicId: String

})

userModel.methods.toJSON= function () {
    const obj = this.toObject()
    delete obj.password
    return obj
}

export default mongoose.model('User',userModel)