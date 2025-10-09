const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { dbConnect } = require("./db/dbConnect");
const { addUrl } = require("./routes/addUrl");
require("dotenv").config();

dbConnect();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

// Add url
app.post("/api/shorten", addUrl);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
