import jwt from "jsonwebtoken";

export const verifyToken = (token: string | null): boolean => {
  try {
    if (token==null) return false;
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "meh");
    return !!decoded;
  } catch (err) {
    return true;
  }
};
