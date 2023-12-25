const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

const getChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ error: "No such user exists!" });
  }

  let chat = await Chat.find({
    users: { $elemMatch: { $eq: req.user.id } },
    users: { $elemMatch: { $eq: userId } },
  })
    .populate("users", "-password")
    .populate("latestMessage");

  chat = await User.populate(chat, {
    path: "latestMessage.sender",
    select: "name email _id",
  });

  if (chat.length > 0) {
    console.log(chat[0])
    res.send(chat[0]);
  } else {
    const createChat = await Chat.create({
      chatName: "sender",
      users: [req.user._id, userId],
    });
    console.log(createChat);
    const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
      "users",
      "-password"
    );

    res.status(201).json(fullChat);
  }
};

const getChats = async (req, res) => {
  const chat = await Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
    .populate("users", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  const user = await User.populate(chat, {
    path: "latestMessage.sender",
    select: "name email _id",
  });

  res.status(201).json(user);
};
module.exports = {
  getChat,
  getChats,
};
