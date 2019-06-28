import { router as productsRoute } from "./productsRoute";
import { router as categoriesRoute } from "./categoriesRoute";
import { router as loginRoute } from "./loginRoute";
import { Router } from "express";

interface RouteConfig {
  prefix: string;
  router: Router;
}

const config: { [k: string]: RouteConfig } = {
  products: {
    prefix: "/api/products",
    router: productsRoute
  },
  categories: {
    prefix: "/api/categories",
    router: categoriesRoute
  },
  login: {
    prefix: "/api/login",
    router: loginRoute
  }
};

export { config };
