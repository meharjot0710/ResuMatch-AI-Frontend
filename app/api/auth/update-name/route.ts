import { NextRequest, NextResponse } from 'next/server';
import User from '../../../../models/User';
import { connectToDb } from '@/lib/mongodb';
import { verifyTok } from '../../verifytok';

export async function PUT(req: NextRequest) {
    try {
        await connectToDb();
        
        // Get authorization header
        const authHeader = req.headers.get('authorization');
        const authResult = verifyTok(authHeader);
        
        if (!authResult.success) {
            return NextResponse.json(
                { message: authResult.message },
                { status: 401 }
            );
        }

        const { name } = await req.json();
        const userId = authResult.decoded.userId;

        // Validate input
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return NextResponse.json(
                { message: "Name is required and cannot be empty" },
                { status: 400 }
            );
        }

        if (name.trim().length < 2) {
            return NextResponse.json(
                { message: "Name must be at least 2 characters long" },
                { status: 400 }
            );
        }

        // Find and update user
        const user = await User.findByIdAndUpdate(
            userId,
            { name: name.trim() },
            { new: true }
        );

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Name updated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                totalAnalysis: user.totalAnalysis,
                avgMatchScore: user.avgMatchScore
            }
        });

    } catch (error: any) {
        console.error('Name update error:', error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
} 