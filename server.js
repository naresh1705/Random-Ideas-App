const express = require("express");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();
const connectDB = require("./config/db.js");

connectDB();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:3000"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Welcome to the random Ideas Api");
});

const ideasRouter = require("./routes/ideas.js");
app.use("/api/ideas", ideasRouter);

app.listen(port, () => {
  console.log(`Server is running in the port ${port}`);
});
