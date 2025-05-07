import { vnpayReturn } from "../controllers/paymentController.js";
import express from 'express'

const paymentRouter = express.Router()
paymentRouter.get("/vnpay-return", vnpayReturn);

export default paymentRouter;