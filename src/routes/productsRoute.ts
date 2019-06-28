import express from "express";
import { authorize, authenticate } from "../middleware/auth";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  isProductNameLengthValid,
  checkIfIdIsNumber,
  productNotFound
} from "../controllers";
import { wrapAsync, wrapAsyncAndSend } from "../utils/async";
import { UserRole } from "../models";

const router = express.Router();

router.get(
  "/",
  authenticate(),
  authorize(UserRole.Reader, UserRole.Contributor, UserRole.Admin),
  wrapAsyncAndSend(getProducts)
);

router.get(
  "/:id",
  authenticate(),
  authorize(UserRole.Reader, UserRole.Contributor, UserRole.Admin),
  wrapAsync(checkIfIdIsNumber),
  wrapAsync(productNotFound),
  wrapAsyncAndSend(getProductById)
);

router.post(
  "/",
  authenticate(),
  authorize(UserRole.Contributor, UserRole.Admin),
  wrapAsync(isProductNameLengthValid),
  wrapAsyncAndSend(createProduct, 201)
);

router.put(
  "/:id",
  authenticate(),
  authorize(UserRole.Contributor, UserRole.Admin),
  wrapAsync(checkIfIdIsNumber),
  wrapAsync(productNotFound),
  wrapAsync(isProductNameLengthValid),
  wrapAsyncAndSend(updateProduct)
);

router.delete(
  "/:id",
  authenticate(),
  authorize(UserRole.Admin),
  wrapAsync(checkIfIdIsNumber),
  wrapAsync(productNotFound),
  wrapAsyncAndSend(deleteProduct, 204)
);

export { router };
