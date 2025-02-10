import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./productsController";
import { validateData } from "../../middlewares/validationMiddleware";
import { z } from "zod";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productSchema";

export type ProductType = z.infer<typeof createProductSchema>;
const router = Router();
router.get("/", listProducts);
router.get("/:id", getProductById);
router.post("/", validateData(createProductSchema), createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", validateData(updateProductSchema), updateProduct);

export default router;
