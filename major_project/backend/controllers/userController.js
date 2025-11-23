const { Error } = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (_id) => {
  //the unique identifier, Key and some info
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};

const loginUser = async (req, res) => {
  const { email, urn, password } = req.body;
  //to catch the existing user error

  try {
    const user = await User.login(email, urn, password);
    //create a token
    const token = createToken(user._id);
    res
      .status(200)
      .json({ _id: user._id, name: user.name, email, token, urn: user.urn });
    console.log(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
};

//signup
//can't use this keyword with ()=>
//need to use a regular function

const signupUser = async function (req, res) {
  const {
    name,
    email,
    phone,
    urn,
    password,
    role,
    branch,
    year,
    ridetype,
    location,
  } = req.body;
  //to catch the existing user error

  try {
    const user = await User.signup(
      name,
      email,
      phone,
      urn,
      password,
      role,
      location,
      branch,
      year,
      ridetype
    );
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name: user.name, email, token });
    console.log(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
};

const getLocResults = async function (req, res) {
  const loc = req.query.loc;
  console.log(loc);
  const users = await User.find({ location: loc, role: "offerer" })
    .select("name _id email location urn branch year role")
    .then((user) => {
      if (user == null) {
        throw new Error("No matching rides");
      }
      res.status(200).json(user);
      console.log(user);
    })
    .catch((error) => {
      console.log("Error is : " + error.message);
      res.status(400).json({ error: error.message });
    });
};

const searchUser = async (req, res) => {
  const { search } = req.query;

  const user = await User.find({
    name: { $regex: search, $options: "i" },
  }).select("name _id email");

  if (user) res.status(200).json(user);
  else {
    res.status(400).json("No such user exists");
  }
};

const searchUserProfile = async (req, res) => {
  const { urn } = req.query;
  console.log(urn);
  const user = await User.find({
    urn: urn,
  }).select("name _id email location branch year ridetype");
  console.log(user);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw Error("No such user exists");
  }
};

module.exports = {
  signupUser,
  loginUser,
  getLocResults,
  searchUser,
  searchUserProfile,
};
