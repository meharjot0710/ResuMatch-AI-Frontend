import jwt from "jsonwebtoken";

export function verifyToken(token: string | null) {
    try {
        if (token==null) return false;
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'meh');
        return decoded;
      } catch (err:any) {
    const errorMessages: Record<string, string> = {
      TokenExpiredError: 'Unauthorized! Token has expired.',
      JsonWebTokenError: 'Unauthorized! Invalid Token.'
    };
    return {
      message: errorMessages[err] || 'Authentication failed.'
    };
    }
}