const PlaceModel = require("../models/PlaceModel");
const generalHandle = require("./static");

const addPlace = async (req, res) => {
  generalHandle(
    async () => {
      const { name, creator, lat, lng, comment } = req.body;
      const comments = [{ comment: comment, commentator: creator }];
      await PlaceModel.create({
        name,
        creator,
        lat,
        lng,
        comments,
      });
      res.status(200).json({ msg: "Place added successfully." });
    },
    res,
    "Failed to add this place. Server error."
  );
};

const getPlaces = async (req, res) => {
  generalHandle(
    async () => {
      const { searchContent, creator } = req.query;
      if (creator) {
        const result = await PlaceModel.find({ creator: creator });
        return res.status(200).json({ result });
      } else {
        if (searchContent === "all") {
          const result = await PlaceModel.find();
          return res.status(200).json({ result });
        } else {
          const result = await PlaceModel.find({
            $or: [
              {
                comments: { $elemMatch: { comment: searchContent } },
              },
              { name: searchContent },
              { comments: { $elemMatch: { commentator: searchContent } } },
            ],
          });
          return res.status(200).json({ result });
        }
      }
    },
    res,
    "Failed to load places. Server error."
  );
};

module.exports = { addPlace, getPlaces };
