const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    let token;
    
    if (authHeader) {
        // Check if token is in "Bearer <token>" format
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7); // Remove "Bearer " prefix
        } else {
            token = authHeader; // Direct token
        }
    }
    
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, 'secret123');
        req.user = decoded;
        next();
    } catch (err) {
        console.error('JWT Error:', err.message);
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = jwtAuthMiddleware;