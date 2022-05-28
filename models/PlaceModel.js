const connection = require("../database");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    commentator: { type: String, required: true },
  },
  { timestamps: true }
);

const placeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    creator: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const PlaceModel = connection.model("place", placeSchema);

module.exports = PlaceModel;
