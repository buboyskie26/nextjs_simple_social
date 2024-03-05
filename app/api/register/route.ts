import { NextRequest, NextResponse } from 'next/server';
import { postSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import bcrypt from 'bcrypt';

import prisma from '@/prisma/client';

const registerSchemaValidation = z.object({
  email: z.string().email('Invalid email format.').min(1, 'Email is required.'),
  password: z
    .string()
    .min(5, 'Password must be at least 5 characters long.')
    .max(50),
});

export async function POST(request: NextRequest) {
  //   const { email, password } = await request.json();
  const body = await request.json();

  const validation = registerSchemaValidation.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  // Check email, if there's throw an error

  const user = await prisma?.user.findUnique({
    where: { email: body.email },
  });

  if (user)
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const registerUser = await prisma?.user.create({
    // If unique, register the user
    data: {
      email: body.email,
      hashedPassword: hashedPassword,
    },
  });

  return NextResponse.json({ email: registerUser?.email });
}
