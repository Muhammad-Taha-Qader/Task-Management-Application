
import jwt from "jsonwebtoken";

export const authMiddleware = (handler) => {
  return async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized. Token is missing." });
    }

    const token = authHeader.split(" ")[1]; // Extract the token 

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
      req.user = decoded; // Attach the decoded user to the request object
      console.log("Decoded User in Middleware:", req.user);

      return handler(req, res); // Proceed to the handler
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized. Invalid or expired token." });
    }
  };
};
