import { PrismaClient } from "@prisma/client";
import getLogger from "../utils/Logger";

const logger = getLogger("seed");

const prisma = new PrismaClient();

export const main = async () => {
  try {
    logger.log("silly", `Seed function ran`);
  } catch (error) {
    logger.log("error", "Error during seed ---", { error });
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main();
