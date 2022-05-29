const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const placeRouter = require("./routers/placeRouter");
const userRouter = require("./routers/userRouter");
const validation = require("./controllers/validation");

app.get('/api',(req,res)=>{return res.send('hello world')})

app.use("/api/place", validation, placeRouter);

app.use("/api/user", userRouter);

app.listen(process.env.PORT ||443, () => {
  console.log("Server listening on port 443.");
});
