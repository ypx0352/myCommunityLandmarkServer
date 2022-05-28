const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModle");

const login = async (req, res) => {
  // Confirm this account exists
  let hashedPassword = "";

  try {
    const result = await UserModel.findOne({ username: req.body.username });
    if (result === null) {
      return res
        .status(400)
        .json({ msg: "User does not exist, please register first." });
    }
    hashedPassword = result.password;
    username = result.username;
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Failed to check user registration status." });
  }

  // Verify password
  try {
    const result = await bcrypt.compare(req.body.password, hashedPassword);
    if (!result) {
      return res.status(400).json({ msg: "Wrong password." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Failed to verify your password. Server error." });
  }

  // Return token to front-end
  try {
    const token = jwt.sign({ username }, process.env.JWT_KEY, {
      expiresIn: "24h", // 24 hours
    });
    return res
      .status(200)
      .json({ msg: "Login successfully.", token, username });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to get token. Server error." });
  }
};

const register = async (req, res) => {
  // Check duplication of username in database
  const { registerInfo } = req.body;
  try {
    const result = await UserModel.findOne({ username: registerInfo.username });
    if (result !== null) {
      return res.status(400).json({ msg: "User exists, please login." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Failed to check duplication. Server error." });
  }

  // Save register data to database
  try {
    registerInfo.password = await bcrypt.hash(registerInfo.password, 10);
    await UserModel.create({
      username: registerInfo.username,
      password: registerInfo.password,
    });
    return res.status(200).json({
      msg: "Your account has been registered successfully. Please login.",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Failed to register user to database. Server error." });
  }
};

module.exports = { login, register };
