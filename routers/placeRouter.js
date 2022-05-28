const router = require("express").Router();
const { addComment } = require("../controllers/comment");
const { addPlace, getPlaces } = require("../controllers/place");

router.put("/add_comment", addComment);

router.post("/add_place", addPlace);

router.get("/get_place", getPlaces);

module.exports = router;
