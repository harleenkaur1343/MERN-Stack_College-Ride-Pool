require("dotenv").config();
const mongoose = require("mongoose");

const db = process.env.MONGO_URI;

module.exports = db;
