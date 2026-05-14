const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const clientRoutes = require("./routes/clientRoutes");
const errorHandler = require("./middleware/errorHandler");
const { apiLimiter } = require("./utils/rateLimiter");

// Load models
const User = require("./models/User");
const Organization = require("./models/Organization");
const Invoice = require("./models/Invoice");
const Payment = require("./models/Payment");
const Client = require("./models/Client");

// Database connection & Server start

dotenv.config();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(apiLimiter);

// CORS configuration - Essential for Clerk frontend to talk to backend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes
app.use("/api/v1/users", authRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/invoices", invoiceRoutes);
app.use("/api/v1/clients", clientRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Global error handler
app.use(errorHandler);

// Database connection & Server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connection has been established successfully.");

    // Sync models
    await sequelize.sync({ force: false });
    console.log("Database models synchronized.");

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`App running on port ${port}...`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

startServer();
