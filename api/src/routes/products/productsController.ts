import { Request, Response } from "express";

export async function listProducts(req: Request, res: Response) {
  res.send("The list of products");
}

export async function getProductById(req: Request, res: Response) {
  res.send(`Product: ${req.params.id}`);
}

export async function createProduct(req: Request, res: Response) {
  res.send("Create");
}

export async function updateProduct(req: Request, res: Response) {
  res.send("Update");
}

export async function deleteProduct(req: Request, res: Response) {
  res.send("Delete");
}
