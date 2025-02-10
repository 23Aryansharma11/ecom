import express, { json, urlencoded } from "express";
import productRouter from "./routes/products/index.js";
import authRoutes from "./routes/auth/index.js";

const port = process.env.PORT || 3000;
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/product", productRouter);
app.use("/auth", authRoutes);
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
