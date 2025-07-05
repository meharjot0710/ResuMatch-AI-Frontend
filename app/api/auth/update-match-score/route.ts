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

        const { matchScore } = await req.json();
        const userId = authResult.decoded.userId;

        // Validate input
        if (typeof matchScore !== 'number' || matchScore < 0 || matchScore > 100) {
            return NextResponse.json(
                { message: "Match score must be a number between 0 and 100" },
                { status: 400 }
            );
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Calculate new average match score
        const currentTotalScore = user.avgMatchScore * user.totalAnalysis;
        const newTotalAnalysis = user.totalAnalysis + 1;
        const newTotalScore = currentTotalScore + matchScore;
        const newAvgMatchScore = newTotalScore / newTotalAnalysis;

        // Update user's average match score and total analysis count
        user.avgMatchScore = Math.round(newAvgMatchScore * 100) / 100; // Round to 2 decimal places
        user.totalAnalysis = newTotalAnalysis;
        
        await user.save();

        return NextResponse.json({
            message: "Match score updated successfully",
            newAvgMatchScore: user.avgMatchScore,
            totalAnalysis: user.totalAnalysis
        });

    } catch (error: any) {
        console.error('Match score update error:', error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
} 