import { Router } from "express";
import { CheckoutController }
  from "../controllers/checkoutController";

import { authMiddleware }
  from "../middleware/authMiddleware";

const router = Router();

router.post(
  "/checkout",
  authMiddleware,
  CheckoutController.checkout
);

export default router;