import express from "express";
import { store } from "../store";

const router = express.Router();

router.get("/", (req, res) => res.render("login", { pageTitle: "Login Page" }));
router.get("/home", (req, res) =>
  res.render("home", { pageTitle: "Welcome to BRStore!" })
);
router.get("/categories", (req, res) => {
  const categories = store.loadCategories;
  res.render("categories", {
    pageTitle: "Categories Page",
    categories
  });
});

export { router };
