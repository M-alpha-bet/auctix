import { z } from "zod";

// Custom file validation
const fileSchema = z.any().refine((file) => file instanceof File, {
  message: "Expected a file",
});

export const formSchema = z.object({
  lotName: z.string().min(1).max(300),
  description: z.string().min(10).max(10000),
  bidEndTime: z.coerce.date({
    required_error: "Bid end time is required",
    invalid_type_error: "Invalid date format",
  }),
  considerations: z.string().min(1),
  category: z.string().min(1).max(100),
  origin: z.string().min(1),
  material: z.string().min(1),
  dimension: z.string().min(1),
  finish: z.string().min(1),
  includes: z.string().min(1),
  lotImage1: fileSchema,
  lotImage2: fileSchema,
  lotImage3: fileSchema,
  lotImage4: fileSchema,
});
