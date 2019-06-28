import joi from "joi";
import { idSchema, nameSchema } from "./common";

export const productSchema = {
  id: idSchema,
  name: nameSchema,
  categoryId: joi.string(),
  itemsInStock: joi.number()
};

export const categorySchema = {
  id: idSchema,
  name: nameSchema
};
