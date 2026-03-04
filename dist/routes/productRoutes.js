"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Public route: anyone can view products
router.get("/", productController_1.ProductController.getAll);
// Protected route: only authenticated ADMIN can create products
router.post("/", authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)("ADMIN"), productController_1.ProductController.create);
exports.default = router;
