import db from "@/services/db";
import { RequestHandler } from "express";
import httpStatus from "http-status";

interface CreateUserRequestBody {
  name: string;
  email: string;
}

export const createUser: RequestHandler<{}, {}, CreateUserRequestBody> = async (
  req,
  res,
  next
) => {
  try {
    const { email, name } = req.body;

    const existingUser = await db.user.findUnique({ where: { email } });

    if (existingUser) {
      const userProfile = await db.userProfile.findUnique({
        where: { userId: existingUser.id },
        include: { user: true },
      });

      return res.json({
        ok: true,
        user: userProfile,
      });
    }

    const newUser = await db.userProfile.create({
      data: {
        name,
        user: {
          create: {
            email,
          },
        },
      },
      include: { user: true },
    });

    return res.status(httpStatus.CREATED).json({
      ok: true,
      user: newUser,
    });
  } catch (err) {
    return next(err);
  }
};
