const jwt = require("jsonwebtoken");

/**
 * Protect Middleware
 * Used to verify the JWT token and protect private routes.
 */
const protect = async (req, res, next) => {
   
    try {
        // 1. Get the token from the request headers
// 1. Get the raw authorization header
const authHeader = req.headers.authorization;

// 2. Check if the header exists
if (!authHeader) {
    return res.status(401).json({ message: "No authorization header provided" });
}

// 3. Extract the token (handle "Bearer <token>")
// Split by space and take the second part
const token = authHeader.split(" ")[1];

        // 2. Check if the token exists
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Not authorized, please login again" 
            });
        }
    

        // 3. Verify the token using your JWT_SECRET
        // Since you used jwt.sign({ userId: user._id }, ...) in your controller,
        // the decoded object will contain the userId.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Attach the userId to the request object (req.userId)
        // This allows subsequent controllers to know which user is making the request.
        
        req.userId = decoded.userId;

        // 5. Call next() to move to the controller function
        next();

    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).json({ 
            success: false, 
            message: "Unauthorized: Invalid or expired token" 
        });
    }
};

module.exports = protect;