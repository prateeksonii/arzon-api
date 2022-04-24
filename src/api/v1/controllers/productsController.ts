import db from "@/services/db";
import { RequestHandler } from "express";
import httpStatus from "http-status";

interface CreateProductBody {
  name: string;
  description: string;
  price: number;
  image: string;
}

export const createProduct: RequestHandler<{}, {}, CreateProductBody> = async (
  req,
  res,
  next
) => {
  try {
    const { description, image, name, price } = req.body;

    const product = await db.product.create({
      data: {
        description,
        name,
        price,
        image,
      },
    });

    return res.status(httpStatus.CREATED).json({
      ok: true,
      product,
    });
  } catch (err) {
    return next(err);
  }
};
