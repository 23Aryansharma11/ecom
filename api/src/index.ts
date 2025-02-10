import express from "express";
const port = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
