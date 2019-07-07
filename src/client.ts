import { createHttpClient } from "./utils/http-client";
import { createLogger } from "./utils/logger";
import { IProduct, ICategory } from "./models";
import request from "request-promise";
import { store } from "./store";

// const defaultClient = createHttpClient();
const logger = createLogger("client-sample");

export async function makeCalls(baseUrl: string) {
  const client = request.defaults({
    baseUrl: `${baseUrl}/public/public`,
    json: true
  });

  store.loadCategories = await client.get("/categories.json");
  store.loadProducts = await client.get("/products.json");
  store.loadUsers = await client.get("/users.json");
  store.loadCredentials = await client.get("/credentials.json");
}
