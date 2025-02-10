import express, { json, urlencoded } from "express";
import productRouter from "./routes/products";

const port = process.env.PORT;
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/product", productRouter);

app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
