const connection = require("../database");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
},{timestamps:true});

const UserModel = connection.model('user',userSchema)

module.exports = UserModel