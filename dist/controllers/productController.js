"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const Product_1 = require("../models/Product");
class ProductController {
    static async getAll(req, res, next) {
        try {
            const products = await Product_1.Product.find(); // fetch all fields
            res.json({
                data: products,
                pagination: {
                    total: products.length,
                    page: 1,
                    pages: 1,
                },
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async create(req, res, next) {
        try {
            const { name, description, price, stock } = req.body;
            const product = await Product_1.Product.create({ name, description, price, stock });
            res.status(201).json(product);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.ProductController = ProductController;
