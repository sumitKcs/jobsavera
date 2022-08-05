const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./db");
const jobRouter = require("./routes/job");

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/api/job", jobRouter);

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
