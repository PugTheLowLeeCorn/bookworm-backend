import express from "express";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";
import User from "../models/User.js";
import Book from "../models/Book.js";
import cloudinary from "../lib/cloudinary.js";

const router = express.Router();

// Middleware để bảo vệ tất cả các routes admin
router.use(protectRoute, adminRoute);

// Lấy danh sách tất cả người dùng
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Khóa/mở khóa người dùng
router.patch("/users/:userId/toggle-ban", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBanned = !user.isBanned;
    await user.save();

    res.json({ message: user.isBanned ? "User banned" : "User unbanned", user });
  } catch (error) {
    console.error("Error toggling user ban:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Xóa người dùng
router.delete("/users/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Xóa tất cả sách của người dùng
    const books = await Book.find({ user: user._id });
    for (const book of books) {
      if (book.image && book.image.includes("cloudinary")) {
        const publicId = book.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }
    }
    await Book.deleteMany({ user: user._id });

    // Xóa người dùng
    await user.deleteOne();

    res.json({ message: "User and their books deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Lấy danh sách tất cả sách
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find().populate("user", "username profileImage");
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Xóa sách
router.delete("/books/:bookId", async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Xóa ảnh từ cloudinary
    if (book.image && book.image.includes("cloudinary")) {
      const publicId = book.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await book.deleteOne();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Thống kê
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBooks = await Book.countDocuments();
    const bannedUsers = await User.countDocuments({ isBanned: true });
    const adminUsers = await User.countDocuments({ role: "admin" });

    res.json({
      totalUsers,
      totalBooks,
      bannedUsers,
      adminUsers,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router; 