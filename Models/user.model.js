import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true
        },
        balance:{
            type:Number,
            default:10000
        }
    },
    {
        timestamps:true
    }
)

export const UserData = mongoose.model('userdata', userDataSchema);
