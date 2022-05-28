const jwt = require("jsonwebtoken");

const validation = async (req, res, next) => {
  const token = req.headers.authorization;
  const { searchContent } = req.query;

  // Allow search without login.
  if (searchContent !== undefined) {
    return next();
  }

  if (!token) {
    return res.status(400).json({ msg: "Please login to continue." });
  }

  try {
    const decode = await jwt.verify(token, process.env.JWT_KEY);
    req.user = { user_id: decode.user_id };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: " Please login to continue.",
    });
  }
};

module.exports = validation;
