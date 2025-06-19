import jwt from "jsonwebtoken";

export const verifyTok = (authToken: string | null) => {
  if (!authToken) {
    return { success: false, message: "Unauthorized. No token provided." };
  }

  const token = authToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "meh");
    return { success: true, decoded };
  } catch (err: any) {
    const errorMessages: Record<string, string> = {
      TokenExpiredError: "Unauthorized! Token has expired.",
      JsonWebTokenError: "Unauthorized! Invalid Token.",
    };

    return {
      success: false,
      message: errorMessages[err.name] || "Authentication failed.",
    };
  }
};
