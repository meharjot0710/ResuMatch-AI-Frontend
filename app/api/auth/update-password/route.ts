import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
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

        const { currentPassword, newPassword } = await req.json();
        const userId = authResult.decoded.userId;

        // Validate input
        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { message: "Current password and new password are required" },
                { status: 400 }
            );
        }

        if (newPassword.length < 8) {
            return NextResponse.json(
                { message: "New password must be at least 8 characters long" },
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

        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return NextResponse.json(
                { message: "Current password is incorrect" },
                { status: 400 }
            );
        }

        // Update password (the User model's pre-save hook will hash it)
        user.password = newPassword;
        await user.save();

        return NextResponse.json({
            message: "Password updated successfully"
        });

    } catch (error: any) {
        console.error('Password update error:', error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
} 