import * as z from "zod";

export const signupSchema = z
  .object({
    email: z.string().email("Invalid email."),
    password: z
      .string()
      .min(6, "Password too short")
      .regex(/[0-9]/, "Add a number")
      .regex(/[^A-Za-z0-9]/, "Add a symbol"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().email("Invalid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export type SigninFormData = z.infer<typeof signinSchema>;
