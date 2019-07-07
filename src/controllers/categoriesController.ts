import { store } from "../store/index";
import { ICategory } from "../models";
import { Request, Response, NextFunction } from "express";
import { createLogger } from "../utils/logger";
import { categorySchema, getOrThrow } from "../validations";

const logger = createLogger("categoriesController");

const getCategories = async (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  return store.loadCategories;
};

const getCategoryById = async (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  const id = req.params.id;
  logger.info(`Get category by id ${id}`);
  const existing = (await store.loadCategories).find(p => p.id === id);

  return Promise.resolve(existing);
};

const getProductsByCategory = async (req: Request, res: Response) => {
  const id = req.params.id;
  const existing = (await store.loadProducts).filter(p => p.categoryId === id);

  res.send(existing);
};

const createCategory = async (req: Request, res: Response) => {
  const newCategory = req.body as ICategory;

  newCategory.id = ((await getMaxId()) + 1).toString();

  (await store.loadCategories).push(newCategory);
  return newCategory;
};

const updateCategory = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const category = (await store.loadCategories).find(
    p => p.id === id.toString()
  );

  const categoryToUpdate = req.body as ICategory;
  categoryToUpdate.id = id;
  Object.assign(category, categoryToUpdate);

  res.status(200).send(category);
};

const deleteCategory = async (req: Request, res: Response) => {
  const index = (await store.loadCategories).findIndex(
    p => p.id === req.params.id
  );

  if (index !== 0 && !index) {
    res.sendStatus(404);
  } else {
    (await store.loadCategories).splice(index, 1);
    res.sendStatus(204);
  }
};

const categoryNotFound = async (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  const category = (await store.loadCategories).find(
    p => p.id === req.params.id
  );
  if (category) {
    if (next) {
      next();
    }
  } else {
    res.status(404).send("category not found");
  }
};

const isCategoryNameLengthValid = async (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  const newCategory = req.body as ICategory;
  getOrThrow<ICategory>(newCategory, categorySchema);
  if (next) {
    next();
  }
};

async function getMaxId() {
  let maxId = 1;

  (await store.loadCategories).forEach(e => {
    const id = Number.parseInt(e.id, undefined);
    if (id > maxId) {
      maxId = id;
    }
  });

  return maxId;
}

export {
  getCategories,
  getCategoryById,
  getProductsByCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  isCategoryNameLengthValid,
  categoryNotFound
};
