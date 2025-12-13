const express = require('express');
const router = express.Router();
const { getChat, getChats, deleteChat} = require('../controllers/chatController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);
router.route("/").post(getChat).get(getChats).delete(deleteChat);

module.exports = router;
