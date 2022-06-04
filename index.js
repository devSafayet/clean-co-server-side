const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;


app.get("/", async (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Ami Dowracchi port ${port}`);
});
