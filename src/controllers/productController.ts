import { Request, Response, NextFunction } from "express";
import { Product } from "../models/Product";

export class ProductController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await Product.find(); // fetch all fields
      res.json({
        data: products,
        pagination: {
          total: products.length,
          page: 1,
          pages: 1,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, price, stock } = req.body;
      const product = await Product.create({ name, description, price, stock });
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }
}