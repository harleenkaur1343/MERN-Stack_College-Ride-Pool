const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  //verify the authorization
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization Required" });
  }
  ("Bearer token - split in 2 parts");
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    //returns only id property
    //creating user property
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log("Backend error: ", error.message);
    res.status(404).json({ error: error.message });
  }
};
module.exports = requireAuth;
