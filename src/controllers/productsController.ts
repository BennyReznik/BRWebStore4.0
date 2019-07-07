import { store } from "../store";
import { IProduct } from "../models";
import { Request, Response, NextFunction } from "express";
import { createLogger } from "../utils/logger";
import { getOrThrow, productSchema } from "../validations";

const logger = createLogger("productsController");

const getProducts = async (req: Request, res: Response) => {
  return store.loadProducts;
};

const getProductById = async (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  const id = req.params.id;
  logger.info(`Get product by id ${id}`);
  const existing = (await store.loadProducts).find(p => p.id === id);

  return existing;
};

const createProduct = async (req: Request, res: Response) => {
  const newProduct = req.body as IProduct;

  newProduct.id = ((await getMaxId()) + 1).toString();

  (await store.loadProducts).push(newProduct);
  return newProduct;
};

const updateProduct = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const product = (await store.loadProducts).find(p => p.id === id.toString());

  const productToUpdate = req.body as IProduct;
  productToUpdate.id = id;
  Object.assign(product, productToUpdate);

  return product;
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  const index = (await store.loadProducts).findIndex(
    p => p.id === req.params.id
  );

  if (index !== 0 && !index) {
  } else {
    (await store.loadProducts).splice(index, 1);
  }
};

const productNotFound = async (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  const product = (await store.loadProducts).find(p => p.id === req.params.id);
  if (product) {
    if (next) {
      next();
    }
  } else {
    res.status(404).send("product not found");
  }
};

const isProductNameLengthValid = async (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  const newProduct = req.body as IProduct;
  getOrThrow<IProduct>(newProduct, productSchema);
  if (next) {
    next();
  }
};

async function getMaxId() {
  let maxId = 1;

  (await store.loadProducts).forEach(e => {
    const id = Number.parseInt(e.id, undefined);
    if (id > maxId) {
      maxId = id;
    }
  });

  return maxId;
}

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  isProductNameLengthValid,
  productNotFound
};
