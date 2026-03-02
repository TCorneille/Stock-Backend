import { Request, Response, NextFunction } from "express";
import { Product } from "../models/Product";

export class ProductController {

  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {

      const product =
        await Product.create(req.body);

      res.status(201).json(product);

    } catch (error) {
      next(error);
    }
  }

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {

      const page =
        Number(req.query.page) || 1;

      const limit =
        Number(req.query.limit) || 10;

      const skip =
        (page - 1) * limit;

      const products =
        await Product.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total =
        await Product.countDocuments();

      res.json({

        data: products,

        pagination: {
          total,
          page,
          pages:
            Math.ceil(total / limit)
        }

      });

    } catch (error) {
      next(error);
    }
  }

}