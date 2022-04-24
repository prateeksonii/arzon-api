import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    image: z.string().url({
      message: "Image is not a valid URL",
    }),
    price: z
      .number({
        required_error: "Price is required",
      })
      .nonnegative(),
  }),
});
