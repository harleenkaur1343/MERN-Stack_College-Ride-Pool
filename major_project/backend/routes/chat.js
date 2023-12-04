const express = require('express');
const router = express.Router();
const { getChat, getChats} = require('../controllers/chatController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);
router.route("/").post(getChat).get(getChats);

module.exports = router;