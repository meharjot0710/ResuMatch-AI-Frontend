import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../../models/User'
import { connectToDb } from '@/lib/mongodb';

export async function POST(req:NextRequest){
    await connectToDb();
    const { email, password }= await req.json();
    const user = await User.findOne({email})
    if(!user)
        return NextResponse.json({message: "User not found"});
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch)
        return NextResponse.json({message: "Invalid password"});
    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET || 'meh');
    return NextResponse.json({
        message:"User login successfull!",
        token: token,
        user: user
    })
}