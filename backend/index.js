const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");

// Load models
const User = require("./models/User");
const Organization = require("./models/Organization");

// Load passport strategy
require("./controllers/googleAuthController");

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Route Middlewares
app.use("/api/v1/users", authRoutes);

// General route
app.get("/", (req, res) => {
  res.status(200).send("Collectly PostgreSQL API is running...");
});

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
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
