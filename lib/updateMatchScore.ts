import User from '../models/User';
import { connectToDb } from './mongodb';

export const updateUserMatchScore = async (userId: string, matchScore: number) => {
    try {
        await connectToDb();
        
        // Validate input
        if (typeof matchScore !== 'number' || matchScore < 0 || matchScore > 100) {
            throw new Error('Match score must be a number between 0 and 100');
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Calculate new average match score
        const currentTotalScore = user.avgMatchScore * user.totalAnalysis;
        const newTotalAnalysis = user.totalAnalysis + 1;
        const newTotalScore = currentTotalScore + matchScore;
        const newAvgMatchScore = newTotalScore / newTotalAnalysis;

        console.log('Match Score Update Debug:', {
            userId,
            currentAvgMatchScore: user.avgMatchScore,
            currentTotalAnalysis: user.totalAnalysis,
            newMatchScore: matchScore,
            newTotalAnalysis,
            newAvgMatchScore: Math.round(newAvgMatchScore * 100) / 100
        });

        // Update user's average match score and total analysis count
        user.avgMatchScore = Math.round(newAvgMatchScore * 100) / 100; // Round to 2 decimal places
        user.totalAnalysis = newTotalAnalysis;
        
        await user.save();

        return {
            success: true,
            newAvgMatchScore: user.avgMatchScore,
            totalAnalysis: user.totalAnalysis
        };

    } catch (error: any) {
        console.error('Match score update error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}; 