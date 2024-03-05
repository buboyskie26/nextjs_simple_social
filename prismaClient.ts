// prismaClient.ts

import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

// Function to initialize and return Prisma Client instance
export const getPrismaClient = (): PrismaClient => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};
