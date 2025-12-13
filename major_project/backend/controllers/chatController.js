const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

const getChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ error: "No such user exists!" });
  }

  let chat = await Chat.find({
    users: { $all: [req.user.id, userId] },
    //checks if both user ids exist in users
  })
    .populate("users", "-password")
    .populate("latestMessage");

  chat = await User.populate(chat, {
    path: "latestMessage.sender",
    select: "name email _id",
  });

  if (chat.length > 0) {
    console.log(chat[0]);
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

const deleteChat = async (req, res) => {
  const targetchat_id = req.body.chat_id;
  console.log("Target ID: ",targetchat_id )

  if (!targetchat_id) {
    return res.status(400).json({ error: "Invalid chat reference" });
  }
  try {
    const delMsgs = await Message.deleteMany({ chat: targetchat_id });
    const delChat = await Chat.findByIdAndDelete(targetchat_id);
    console.log(delMsgs);
    console.log("Del chet ", delChat);

    if (!delChat || !delMsgs) {
      res.status(404).json({ error: "No chat found" });
      return;
    }
    res.send({ message: "Chat deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.log(err);
  }
};

module.exports = {
  getChat,
  getChats,
  deleteChat,
};
