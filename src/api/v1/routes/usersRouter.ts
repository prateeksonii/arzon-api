import { validate } from "@/utils/validator";
import { Router } from "express";
import { createUser } from "../controllers/usersController";
import { createUserSchema } from "../schemas/userSchemas";

const usersRouter = Router();

usersRouter.post("/", validate(createUserSchema), createUser);

export default usersRouter;
