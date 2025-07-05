import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '../../../../models/User';
import { connectToDb } from '@/lib/mongodb';
import { verifyTok } from '../../verifytok';

export async function DELETE(req: NextRequest) {
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

        const { password } = await req.json();
        const userId = authResult.decoded.userId;

        // Validate input
        if (!password) {
            return NextResponse.json(
                { message: "Password is required to delete account" },
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

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Password is incorrect" },
                { status: 400 }
            );
        }

        // Delete user account
        await User.findByIdAndDelete(userId);

        return NextResponse.json({
            message: "Account deleted successfully"
        });

    } catch (error: any) {
        console.error('Account deletion error:', error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
} 