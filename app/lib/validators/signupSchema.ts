import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
 role: z.array(z.enum(['BUYER', 'SELLER', 'ADMIN'])).default(['BUYER']),
});

export type RegisterInput = z.infer<typeof signupSchema>;

