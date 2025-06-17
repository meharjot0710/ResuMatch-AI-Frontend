import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../../../models/User'
import { connectToDb } from '@/lib/mongodb';

export async function POST(req:NextRequest){
    await connectToDb();
    const { name, email, password } = await req.json();
    const newUser = new User({
        name,
        email,
        password
    });
    await newUser.save();
    const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET || 'meh', {expiresIn:'7d'});
    return NextResponse.json({
        message:"User registered successfully!",
        token: token,
        user:newUser
    });
}
