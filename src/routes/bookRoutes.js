import express from "express";
import {
  getBooks,
  createBook,
  deleteBook,
  searchBooks,
  getBooksByUser,
} from "../controllers/bookController.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get all books
router.get("/", protectRoute, getBooks);

// Create a book
router.post("/", protectRoute, createBook);

// Delete a book
router.delete("/:id", protectRoute, deleteBook);

// Search books
router.get("/search", protectRoute, searchBooks);

// Get books by user
router.get("/user/:userId", protectRoute, getBooksByUser);

export default router;
