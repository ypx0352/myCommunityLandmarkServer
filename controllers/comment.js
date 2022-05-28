const PlaceModel = require("../models/PlaceModel");
const generalHandle = require("./static");

const addComment = async (req, res) => {
  generalHandle(
    async () => {
      const { place_id, comment, commentator } = req.body;

      await PlaceModel.findOneAndUpdate(
        { _id: place_id },
        {
          $push: {
            comments: [
              {
                comment,
                commentator,
                createdAt: new Date(),
              },
            ],
          },
        }
      );
      res.status(200).json({ msg: "Successfully added the comment." });
    },
    res,
    "Failed to add the comment. Server error."
  );
};

module.exports = { addComment };
