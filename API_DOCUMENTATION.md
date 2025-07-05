# Backend API Functions Documentation

This document describes the new backend functions for user management in the ResuMatch AI application.

## Authentication

All API endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 1. Update Password

**Endpoint:** `PUT /api/auth/update-password`

**Description:** Allows users to update their password with proper validation.

**Request Body:**
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123"
}
```

**Response:**
```json
{
  "message": "Password updated successfully"
}
```

**Error Responses:**
- `400` - Invalid input (missing passwords, password too short)
- `401` - Unauthorized (invalid/missing token)
- `404` - User not found
- `500` - Internal server error

**Validation Rules:**
- Current password must be correct
- New password must be at least 8 characters long

## 2. Update Match Score

**Endpoint:** `PUT /api/auth/update-match-score`

**Description:** Updates the user's average match score after resume analysis.

**Request Body:**
```json
{
  "matchScore": 85.5
}
```

**Response:**
```json
{
  "message": "Match score updated successfully",
  "newAvgMatchScore": 82.3,
  "totalAnalysis": 5
}
```

**Error Responses:**
- `400` - Invalid match score (must be 0-100)
- `401` - Unauthorized (invalid/missing token)
- `404` - User not found
- `500` - Internal server error

**Features:**
- Automatically calculates new average based on existing scores
- Increments total analysis count
- Rounds average to 2 decimal places

## 3. Delete Account

**Endpoint:** `DELETE /api/auth/delete-account`

**Description:** Permanently deletes the user's account after password confirmation.

**Request Body:**
```json
{
  "password": "userPassword123"
}
```

**Response:**
```json
{
  "message": "Account deleted successfully"
}
```

**Error Responses:**
- `400` - Missing password or incorrect password
- `401` - Unauthorized (invalid/missing token)
- `404` - User not found
- `500` - Internal server error

**Security Features:**
- Requires password confirmation
- Permanently removes all user data

## 4. Utility Function: updateUserMatchScore

**File:** `lib/updateMatchScore.ts`

**Description:** Utility function to update user match scores programmatically.

**Usage:**
```typescript
import { updateUserMatchScore } from '@/lib/updateMatchScore';

const result = await updateUserMatchScore(userId, matchScore);
if (result.success) {
  console.log('New average:', result.newAvgMatchScore);
  console.log('Total analyses:', result.totalAnalysis);
} else {
  console.error('Error:', result.error);
}
```

**Parameters:**
- `userId` (string): The user's ID
- `matchScore` (number): The new match score (0-100)

**Returns:**
```typescript
{
  success: boolean;
  newAvgMatchScore?: number;
  totalAnalysis?: number;
  error?: string;
}
```

## Integration with Resume Analysis

The match score update is automatically integrated into the resume analysis process:

**Endpoint:** `POST /api/analyze/resumeupload`

When a resume is analyzed, the system:
1. Extracts the match score from the AI analysis
2. Automatically updates the user's average match score
3. Returns the updated user data along with the analysis

**Response includes:**
```json
{
  "success": true,
  "user": { /* updated user object */ },
  "analysis": { /* AI analysis results */ },
  "matchScoreUpdate": {
    "success": true,
    "newAvgMatchScore": 82.3,
    "totalAnalysis": 5
  }
}
```

## Error Handling

All endpoints include comprehensive error handling:
- Input validation
- Authentication verification
- Database error handling
- Proper HTTP status codes
- Descriptive error messages

## Security Considerations

1. **Password Updates:** Require current password verification
2. **Account Deletion:** Require password confirmation
3. **Authentication:** JWT token verification on all endpoints
4. **Input Validation:** Strict validation for all inputs
5. **Error Messages:** Generic error messages to prevent information leakage

## Database Schema Updates

The User model includes these fields for match score tracking:
```typescript
{
  totalAnalysis: { type: Number, default: 0 },
  avgMatchScore: { type: Number, default: 0 }
}
```

## Usage Examples

### Frontend Integration

```typescript
// Update password
const updatePassword = async (currentPassword: string, newPassword: string) => {
  const response = await fetch('/api/auth/update-password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ currentPassword, newPassword })
  });
  return response.json();
};

// Delete account
const deleteAccount = async (password: string) => {
  const response = await fetch('/api/auth/delete-account', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ password })
  });
  return response.json();
};
``` 