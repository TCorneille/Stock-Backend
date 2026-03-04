import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { authenticate, authorize } from "../middlewares/authMiddleware";

const router = Router();

// Public route: anyone can view products
router.get("/", ProductController.getAll);

// Protected route: only authenticated ADMIN can create products
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  ProductController.create
);

export default router;