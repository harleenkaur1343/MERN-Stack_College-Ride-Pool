const express = require('express');
const { allMessages, sendMessage } = require("../controllers/messageController");
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);
//router.route("/:chatId").get(allMessages);
router.route("/").get(allMessages);

router.route("/").post(sendMessage);

module.exports = router;
