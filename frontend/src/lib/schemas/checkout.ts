import * as z from "zod";

export const checkoutSchema = z.object({
  address: z.string().min(10, "Wrong address"),
  phone: z.string().regex(/^\+?[\d\s-()]{8,}$/, "Wrong phone number"),
});
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
