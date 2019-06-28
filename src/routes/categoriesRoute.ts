import express from "express";

import {
  getCategories,
  getCategoryById,
  getProductsByCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  isCategoryNameLengthValid,
  checkIfIdIsNumber,
  categoryNotFound
} from "../controllers";
import { wrapAsync, wrapAsyncAndSend } from "../utils/async";
import { authorize, authenticate } from "../middleware/auth";
import { UserRole } from "../models";

const router = express.Router();

router.get(
  "/",
  authenticate(),
  authorize(UserRole.Reader, UserRole.Contributor, UserRole.Admin),
  wrapAsyncAndSend(getCategories)
);

router.get(
  "/:id",
  authenticate(),
  authorize(UserRole.Reader, UserRole.Contributor, UserRole.Admin),
  wrapAsync(checkIfIdIsNumber),
  wrapAsync(categoryNotFound),
  wrapAsyncAndSend(getCategoryById)
);

router.get(
  "/:id/products",
  authenticate(),
  authorize(UserRole.Reader, UserRole.Contributor, UserRole.Admin),
  wrapAsync(checkIfIdIsNumber),
  wrapAsync(categoryNotFound),
  wrapAsyncAndSend(getProductsByCategory)
);

router.post(
  "/",
  authenticate(),
  authorize(UserRole.Contributor, UserRole.Admin),
  wrapAsync(isCategoryNameLengthValid),
  wrapAsyncAndSend(createCategory, 201)
);

router.put(
  "/:id",
  authenticate(),
  authorize(UserRole.Contributor, UserRole.Admin),
  wrapAsync(checkIfIdIsNumber),
  wrapAsync(categoryNotFound),
  wrapAsync(isCategoryNameLengthValid),
  wrapAsyncAndSend(updateCategory)
);

router.delete(
  "/:id",
  authenticate(),
  authorize(UserRole.Admin),
  wrapAsync(checkIfIdIsNumber),
  wrapAsync(categoryNotFound),
  wrapAsyncAndSend(deleteCategory, 204)
);

export { router };
