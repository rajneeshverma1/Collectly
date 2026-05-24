const { verifyToken } = require('@clerk/backend');
const Organization = require('../models/Organization');
const User = require('../models/User');
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
    let sessionClaims;
    try {
      sessionClaims = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });
    } catch (verifyError) {
      console.warn('Clerk Token Verification failed, falling back to manual decode in development:', verifyError.message);
      
      // DEVELOPMENT FALLBACK MECHANISM:
      // If we are in local development mode, we bypass Clerk's cryptographic token verify checks.
      // This protects local development workflows from clock skews, connection time-outs,
      // and blocks when the developers are offline or disconnected from Clerk's network.
      if (process.env.NODE_ENV === 'development') {
        const jwt = require('jsonwebtoken');
        sessionClaims = jwt.decode(token);
      }
      
      if (!sessionClaims) {
        return res.status(401).json({
          status: 'fail',
          message: 'Invalid or expired session',
          error: verifyError.message,
        });
      }
    }

    // Attach user data to request object
    req.auth = {
      userId: sessionClaims.sub,
      sessionClaims,
    };

    // Ensure local User exists in our SQLite/PostgreSQL database
    let localUser = await User.findByPk(sessionClaims.sub);
    if (!localUser) {
      let name = "Freelancer";
      let email = "freelancer@collectly.com";
      try {
        const clerkUser = await clerkClient.users.getUser(sessionClaims.sub);
        if (clerkUser) {
          name = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || clerkUser.username || "Freelancer";
          email = clerkUser.emailAddresses[0]?.emailAddress || email;
        }
      } catch (err) {
        console.error("Failed to fetch Clerk details during auto-sync:", err.message);
      }

      localUser = await User.create({
        id: sessionClaims.sub,
        name,
        email,
      });
    }

    // Ensure local Organization exists in our database
    let org = await Organization.findOne({
      where: { ownerId: sessionClaims.sub }
    });

    if (!org) {
      org = await Organization.create({
        name: "My Workspace",
        type: "Freelancer",
        ownerId: sessionClaims.sub,
      });

      // Update local user's organizationId
      localUser.organizationId = org.id;
      await localUser.save();
    }

    // Maintain compatibility with existing controllers expecting req.user.organizationId
    req.user = {
      id: sessionClaims.sub,
      organizationId: org.id,
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
