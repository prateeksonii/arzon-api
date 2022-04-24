import { Router } from "express";
import { validate } from "@/utils/validator";
import { createProduct } from "../controllers/productsController";
import { createProductSchema } from "../schemas/productSchemas";

const productsRouter = Router();

productsRouter.post("/", validate(createProductSchema), createProduct);

export default productsRouter;
