import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({ log: ["info", "error"] });

export default db;
