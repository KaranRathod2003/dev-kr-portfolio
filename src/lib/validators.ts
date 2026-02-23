import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be under 100 characters")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(254, "Email must be under 254 characters")
    .trim(),
  message: z
    .string()
    .min(1, "Message is required")
    .max(2000, "Message must be under 2000 characters")
    .trim(),
});

export const noteSchema = z.object({
  textContent: z.record(z.string(), z.unknown()).optional(),
  textPreview: z.string().max(300).optional(),
  drawingSnapshot: z.record(z.string(), z.unknown()).nullable().optional(),
  drawingThumbnail: z.string().nullable().optional(),
});

export const positionSchema = z.object({
  x: z.number().min(-5000).max(10000),
  y: z.number().min(-5000).max(10000),
});
