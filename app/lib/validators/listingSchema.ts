import { z } from 'zod';

export const listingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(1,"Description is required"),
  category: z.enum(['CROP', 'LIVESTOCK', 'EQUIPMENT', 'SERVICE']),
  price: z.number().positive("Price must be positive"),
  quantity: z.number().positive("Quantity must be positive"),
  unit: z.enum(['KG', 'TON', 'PIECE']),
  province: z.string().min(1, "Province is required"),
  city: z.string().min(1, "City is required"),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  video: z.string().url().optional(),
});

export type ListingInput = z.infer<typeof listingSchema>;