import * as z from "zod";

export const foodSchema = z.object({
  foodName: z.string().min(1, "Food name is required"),
  price: z.string().min(1, "Price is required"),
  ingredients: z.string().min(1, "At least one ingredient required"),
  category: z.string().min(1, "Category is required"),
  image: z.string().optional(),
});
export type foodFormData = z.infer<typeof foodSchema>;
