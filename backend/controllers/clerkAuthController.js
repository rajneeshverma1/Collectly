const clerkClient = require('../config/clerk');
const Organization = require('../models/Organization');
const User = require('../models/User');

/**
 * Create a new organization for a Clerk user
 */
exports.createOrg = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { name, type, experienceLevel, location, projectsCompleted } = req.body;

    // Check if user already has an organization in Clerk metadata or our DB
    const clerkUser = await clerkClient.users.getUser(userId);
    if (clerkUser.publicMetadata.organizationId) {
      return res.status(400).json({
        status: 'error',
        message: 'User already belongs to an organization',
      });
    }



    // Create organization in our DB
    const newOrg = await Organization.create({
      name,
      type,
      experienceLevel,
      location,
      projectsCompleted,
      ownerId: userId, // Using Clerk userId as ownerId
    });

    // Update Clerk user metadata with the new organizationId
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        organizationId: newOrg.id,
        role: 'owner',
      },
    });

    // res.send(newOrg);
    // return;


    res.status(201).json({
      status: 'success',
      data: {
        organization: newOrg,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create organization',
      error: error.message,
    });
  }
};

/**
 * Get current authenticated user's profile from Clerk
 */
exports.getMe = async (req, res) => {
  try {
    const { userId } = req.auth;
    
    // Fetch full user details from Clerk
    const user = await clerkClient.users.getUser(userId);

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
          publicMetadata: user.publicMetadata,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch user profile',
      error: error.message,
    });
  }
};

/**
 * Handle user data synchronization/profiling on login (optional)
 * This could be called from the frontend after a successful Clerk sign-in
 */
exports.handleSync = async (req, res) => {
  try {
    const { userId } = req.auth;
    const user = await clerkClient.users.getUser(userId);

    // Logic to sync user with your own database (PostgreSQL via Sequelize)
    // Example:
    // const [dbUser, created] = await User.findOrCreate({
    //   where: { clerkId: user.id },
    //   defaults: { email: user.emailAddresses[0].emailAddress }
    // });

    res.status(200).json({
      status: 'success',
      message: 'User synchronized successfully',
      data: {
        clerkId: user.id,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Sync failed',
      error: error.message,
    });
  }
};
