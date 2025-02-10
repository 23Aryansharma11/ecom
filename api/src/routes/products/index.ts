import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./productsController";
import { validateData } from "../../middlewares/validationMiddleware";
import { verifySeller, verifyToken } from "../../middlewares/authMiddleware";

import { z } from "zod";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productSchema";

export type ProductType = z.infer<typeof createProductSchema>;
const router = Router();
router.get("/", listProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  verifyToken,
  verifySeller,
  validateData(createProductSchema),
  createProduct
);
router.delete("/:id", verifyToken, verifySeller, deleteProduct);
router.put(
  "/:id",
  verifyToken,
  verifySeller,
  validateData(updateProductSchema),
  updateProduct
);

export default router;
