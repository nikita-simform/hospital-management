const { isExistingUser, doSignup } = require("../../models/user/user.model");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

async function signup(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  const user = req.body;

  const isUserExists = await isExistingUser(user.email);
  if (isUserExists) {
    return res.status(400).json({
      error: "User already exists",
    });
  }
  const newUser = await doSignup(user);
  return res.status(201).json({
    message: "User created succesfully",
    newUser,
  });
}

async function signin(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  const { email, password } = req.body;
  const existingUser = await isExistingUser(email);
  if (!existingUser) {
    return res.status(400).json({
      error: "Email was not found",
    });
  }

  if (!existingUser.authenticate(password)) {
    return res.status(400).json({
      error: "incorrect password",
    });
  }
  const token = jwt.sign({ _id: existingUser._id }, process.env.SECRET,{expiresIn: '1h'});

  res.cookie("token", token, { expire: new Date() + 1 });

  res.status(200).json({
    token,
    user: {
      id: existingUser._id,
      name: existingUser.firstName + " " + existingUser.lastName,
      email: existingUser.email,
    },
  });
}

function logout(req, res) {
  res.clearCookie("token");
  res.json({
    message: "User logged out succesfully",
  });
}

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader != undefined) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(401).json({
      message: "Unauthorised user",
    });
  }
}

function verifyToken(req, res, next) {
  try {
    const decoded = jwt.verify(req.token, process.env.SECRET);
    next();
  } catch (error) {
    return res.status(401).json({
      messgae: "Invalid Token",
    });
  }
}
module.exports = {
  signup,
  signin,
  logout,
  ensureToken,
  verifyToken,
};
