import express from "express";
import productRouter from "./routes/products";

const port = process.env.PORT;
const app = express();

app.use("/product", productRouter);

app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
