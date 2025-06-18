import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { unique } from 'next/dist/build/utils';

const UserModel=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            match:[/\S+@\S+\.\S+/,'Invalid format']
        },
        password:{
            type:String,
            required:true,
            minlength:[8,'The password must contain 8 characters']
        },
        resumeLink:{
            type:String
        },
        totalAnalysis:{
            type: Number,
            default:0            
        },
        avgMatchScore:{
            type:Number,
            default:0
        }
    }
)

UserModel.pre('save', async function(next){
    if(!this.isModified('password'))
        return next();
    try{
        const salt= await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt)
        next();
    }
    catch(error:any){
        next(error);
    }
})

UserModel.methods.comparePassword= async function(candidatePass:any){
    return bcrypt.compare(candidatePass,this.password);
}

const User = mongoose.models.User || mongoose.model('User', UserModel);

export default User;