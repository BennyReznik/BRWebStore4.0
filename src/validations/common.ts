import joi from "joi";

export const idSchema = joi.number().min(0);

export const nameSchema = joi
  .string()
  .required()
  .min(3);
