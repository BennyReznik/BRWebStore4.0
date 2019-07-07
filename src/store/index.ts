import { IProduct } from "../models/product";
import { ICategory } from "../models/category";
import { IUser } from "../models/user";
import { ICredential } from "../models/credentials";

interface Store {
  loadProducts: IProduct[];
  loadCategories: ICategory[];
  loadUsers: IUser[];
  loadCredentials: ICredential[];
}

const store: Store = {
  loadProducts: Array<IProduct>(),
  loadCategories: Array<ICategory>(),
  loadUsers: Array<IUser>(),
  loadCredentials: Array<ICredential>()
};

export { store };
