import express, { json, urlencoded } from "express";
import productRouter from "./routes/products/index.js";
import authRoutes from "./routes/auth/index.js";
import serverless from "serverless-http";

const port = process.env.PORT || 3000;
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/product", productRouter);
app.use("/auth", authRoutes);
if(process.env.NODE_ENV === "dev"){ 
  app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
  }); 
}
export const handler = serverless(app);