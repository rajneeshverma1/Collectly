const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Organization = require("../models/Organization");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res.cookie("jwt", token, cookieOptions);

  const userData = user.toJSON();
  delete userData.password;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user: userData },
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password!",
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.protect = async (req, res, next) => {
  try {
    let token;

    // 1. Check Authorization header (token stored in localStorage)
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    // 2. Fallback to httpOnly cookie
    else if (req.cookies.jwt && req.cookies.jwt !== "loggedout") {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findByPk(decoded.id);

    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "The user belonging to this token no longer exists.",
      });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: "Invalid token or session expired",
    });
  }
};

exports.createOrganization = async (req, res, next) => {
  try {
    const newOrg = await Organization.create({
      name: req.body.name,
      type: req.body.type,
      ownerId: req.user.id,
    });

    await User.update(
      { organizationId: newOrg.id },
      { where: { id: req.user.id } },
    );

    res.status(201).json({
      status: "success",
      data: {
        organization: newOrg,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
};
