const { createClerkClient } = require('@clerk/backend');
const dotenv = require('dotenv');

dotenv.config();

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});

module.exports = clerkClient;
