import { IProduct } from "../models/product";
import { ICategory } from "../models/category";
import products from "./products.json";
import categories from "./categories.json";
import users from "./users.json";
import credentials from "./credentials.json";
import { IUser } from "../models/user";
import { ICredential } from "../models/credentials";

interface Store {
  loadProducts: () => Promise<IProduct[]>;
  loadCategories: () => Promise<ICategory[]>;
  loadUsers: () => Promise<IUser[]>;
  credentials: ICredential[];
}

const store: Store = {
  loadProducts: () => Promise.resolve(products),
  loadCategories: () => Promise.resolve(categories),
  loadUsers: () => Promise.resolve(users),
  credentials
};

export { store };
