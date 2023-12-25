const express = require("express");
const {
  signupUser,
  loginUser,
  getLocResults,
  searchUser,
  searchUserProfile,
} = require("../controllers/userController");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
//login route
/* The underlying functions and routes will be available after the user gets verified in the requireAuth file */
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/", searchUserProfile);

router.use(requireAuth);
router.get("/location/", getLocResults);
router.get("/users", searchUser);

module.exports = router;
