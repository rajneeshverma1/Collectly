const clerkClient = require('../config/clerk');

/**
 * Middleware to protect routes and verify Clerk authentication
 */
const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'fail',
        message: 'No authentication token provided',
      });
    }

    const token = authHeader.split(' ')[1];

    // Verify the session token with Clerk
    const sessionClaims = await clerkClient.verifyToken(token);

    if (!sessionClaims) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid or expired session',
      });
    }

    // Attach user data to request object
    req.auth = {
      userId: sessionClaims.sub,
      sessionClaims,
    };

    // Maintain compatibility with existing controllers expecting req.user.organizationId
    req.user = {
      id: sessionClaims.sub,
      organizationId: sessionClaims.metadata?.organizationId || null,
    };

    next();
  } catch (error) {
    console.error('Clerk Auth Error:', error.message);
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized access',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

module.exports = { requireAuth };
