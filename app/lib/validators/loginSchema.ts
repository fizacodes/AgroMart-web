import { z } from 'zod';

// Zod schema for login input validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// TypeScript type for validated input
export type LoginInput = z.infer<typeof loginSchema>;
