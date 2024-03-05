// Creating a single instance of prisma client
// To ensure we dont have multiple instances running
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
