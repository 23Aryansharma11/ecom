import { Request, Response } from "express";
import { db } from "../../db";
import { productsTable } from "../../db/productSchema";
import { eq } from "drizzle-orm";

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function getProductById(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const { id } = req.params;
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.body)
      .returning();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateProduct(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.body;

    const [product] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, id))
      .returning();

    if (product) {
      return res.status(200).json(product);
    }
    return res.status(404).json({ message: "Product Not found" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function deleteProduct(
  req: Request<{ id: string }>,
  res: Response
) {
  const { id } = req.params;
  try {
    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, Number(id)))
      .returning();
    if (deletedProduct) {
      return res.status(204).json({ message: "Product Deleted" });
    }
    return res.status(404).json({ message: "Product Not found" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
