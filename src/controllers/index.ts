import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  isProductNameLengthValid,
  productNotFound
} from "./productsController";

import {
  getCategories,
  getCategoryById,
  getProductsByCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  isCategoryNameLengthValid,
  categoryNotFound
} from "./categoriesController";

import { checkIfIdIsNumber } from "./sharedHandlers";

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  isProductNameLengthValid,
  checkIfIdIsNumber,
  productNotFound,
  getCategories,
  getCategoryById,
  getProductsByCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  isCategoryNameLengthValid,
  categoryNotFound
};
